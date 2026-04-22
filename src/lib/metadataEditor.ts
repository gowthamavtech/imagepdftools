'use client';

import type piexifType from 'piexifjs';

export interface MetadataField {
  key: string;
  label: string;
  value: string;
}

export interface MetadataGroup {
  id: 'gps' | 'camera' | 'timestamps' | 'author' | 'software' | 'other';
  label: string;
  fields: MetadataField[];
}

export type MetadataGroups = MetadataGroup[];

// ── Field-to-group mapping ────────────────────────────────────────────────────

const GPS_KEYS = new Set([
  'latitude', 'longitude', 'altitude', 'GPSLatitude', 'GPSLatitudeRef',
  'GPSLongitude', 'GPSLongitudeRef', 'GPSAltitude', 'GPSAltitudeRef',
  'GPSSpeed', 'GPSSpeedRef', 'GPSImgDirection', 'GPSImgDirectionRef',
  'GPSDateStamp', 'GPSTimeStamp', 'GPSSatellites', 'GPSDOP',
]);

const CAMERA_KEYS = new Set([
  'Make', 'Model', 'LensModel', 'LensMake', 'FocalLength',
  'FocalLengthIn35mmFormat', 'FNumber', 'ApertureValue', 'ExposureTime',
  'ShutterSpeedValue', 'ISOSpeedRatings', 'ISO', 'Flash', 'WhiteBalance',
  'ExposureMode', 'ExposureProgram', 'MeteringMode', 'SceneCaptureType',
  'Contrast', 'Saturation', 'Sharpness', 'DigitalZoomRatio',
  'MaxApertureValue', 'BrightnessValue', 'ExposureBiasValue',
  'SensingMethod', 'FileSource', 'SceneType', 'ColorSpace',
  'PixelXDimension', 'PixelYDimension', 'Orientation',
]);

const TIMESTAMP_KEYS = new Set([
  'DateTimeOriginal', 'DateTimeDigitized', 'DateTime',
  'SubSecTimeOriginal', 'SubSecTimeDigitized', 'SubSecTime',
  'OffsetTime', 'OffsetTimeOriginal', 'OffsetTimeDigitized',
]);

const AUTHOR_KEYS = new Set([
  'Artist', 'Copyright', 'ImageDescription', 'UserComment',
  'XPAuthor', 'XPComment', 'XPKeywords', 'XPSubject', 'XPTitle',
]);

const SOFTWARE_KEYS = new Set([
  'Software', 'ProcessingSoftware', 'HostComputer',
  'DeviceSettingDescription',
]);

function groupKey(key: string): MetadataGroup['id'] {
  if (GPS_KEYS.has(key)) return 'gps';
  if (CAMERA_KEYS.has(key)) return 'camera';
  if (TIMESTAMP_KEYS.has(key)) return 'timestamps';
  if (AUTHOR_KEYS.has(key)) return 'author';
  if (SOFTWARE_KEYS.has(key)) return 'software';
  return 'other';
}

function formatValue(key: string, val: unknown): string {
  if (val === null || val === undefined) return '';
  if (val instanceof Date) return val.toLocaleString();
  if (key === 'FNumber' || key === 'ApertureValue') return `f/${Number(val).toFixed(1)}`;
  if (key === 'ExposureTime') {
    const n = Number(val);
    return n < 1 ? `1/${Math.round(1 / n)}s` : `${n}s`;
  }
  if (key === 'FocalLength' || key === 'FocalLengthIn35mmFormat') return `${Number(val).toFixed(0)}mm`;
  if (key === 'ISOSpeedRatings' || key === 'ISO') return `ISO ${val}`;
  if (key === 'latitude' || key === 'longitude') return Number(val).toFixed(7) + '°';
  if (key === 'altitude') return `${Number(val).toFixed(1)}m`;
  if (Array.isArray(val)) return val.join(', ');
  return String(val);
}

// ── Read metadata ─────────────────────────────────────────────────────────────

export async function readMetadata(file: File): Promise<MetadataGroups> {
  const exifr = await import('exifr');
  let raw: Record<string, unknown> | undefined;
  try {
    raw = await exifr.parse(file, {
      tiff: true, exif: true, gps: true, iptc: true, xmp: false, icc: false, jfif: false,
      translateValues: true, translateKeys: true, reviveValues: true,
    });
  } catch {
    return [];
  }

  if (!raw) return [];

  const buckets: Record<MetadataGroup['id'], MetadataField[]> = {
    gps: [], camera: [], timestamps: [], author: [], software: [], other: [],
  };

  for (const [key, val] of Object.entries(raw)) {
    const formatted = formatValue(key, val);
    if (!formatted) continue;
    const label = key.replace(/([A-Z])/g, ' $1').trim();
    buckets[groupKey(key)].push({ key, label, value: formatted });
  }

  const GROUP_META: { id: MetadataGroup['id']; label: string }[] = [
    { id: 'gps',        label: 'GPS & Location' },
    { id: 'camera',     label: 'Camera & Lens' },
    { id: 'timestamps', label: 'Timestamps' },
    { id: 'author',     label: 'Author & Rights' },
    { id: 'software',   label: 'Software & Device' },
    { id: 'other',      label: 'Other' },
  ];

  return GROUP_META
    .map(({ id, label }) => ({ id, label, fields: buckets[id] }))
    .filter((g) => g.fields.length > 0);
}

// ── Strip selected groups (JPEG: selective; PNG/WebP: strip all) ──────────────

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

// piexifjs uses binary strings — convert ArrayBuffer → binary string
function arrayBufferToBinaryString(buf: ArrayBuffer): string {
  const u8 = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return s;
}

// Tag number sets per group (for piexifjs selective write-back)
function buildKeptExif(
  original: ReturnType<typeof piexifType.load>,
  keptGroups: Set<string>,
  piexif: typeof piexifType,
) {
  type ExifDict = ReturnType<typeof piexifType.load>;
  const out: ExifDict = { '0th': {}, Exif: {}, GPS: {}, Interop: {}, '1st': {}, thumbnail: undefined };

  // GPS IFD — keep entirely if 'gps' is kept
  if (keptGroups.has('gps') && original.GPS) out.GPS = { ...original.GPS };

  // Tags we always keep (structural, not metadata)
  const ALWAYS_0TH = new Set([
    piexif.ImageIFD.ImageWidth, piexif.ImageIFD.ImageLength,
    piexif.ImageIFD.BitsPerSample, piexif.ImageIFD.Compression,
    piexif.ImageIFD.PhotometricInterpretation, piexif.ImageIFD.SamplesPerPixel,
    piexif.ImageIFD.XResolution, piexif.ImageIFD.YResolution,
    piexif.ImageIFD.ResolutionUnit, piexif.ImageIFD.Orientation,
  ]);

  const CAMERA_0TH  = new Set([piexif.ImageIFD.Make, piexif.ImageIFD.Model]);
  const CAMERA_EXIF = new Set([
    piexif.ExifIFD.FocalLength, piexif.ExifIFD.FocalLengthIn35mmFilm,
    piexif.ExifIFD.FNumber, piexif.ExifIFD.ApertureValue,
    piexif.ExifIFD.ExposureTime, piexif.ExifIFD.ShutterSpeedValue,
    piexif.ExifIFD.ISOSpeedRatings, piexif.ExifIFD.Flash,
    piexif.ExifIFD.WhiteBalance, piexif.ExifIFD.ExposureMode,
    piexif.ExifIFD.ExposureProgram, piexif.ExifIFD.MeteringMode,
    piexif.ExifIFD.LensSpecification, piexif.ExifIFD.LensModel,
    piexif.ExifIFD.BrightnessValue, piexif.ExifIFD.ExposureBiasValue,
    piexif.ExifIFD.MaxApertureValue, piexif.ExifIFD.ColorSpace,
    piexif.ExifIFD.PixelXDimension, piexif.ExifIFD.PixelYDimension,
    piexif.ExifIFD.SceneCaptureType, piexif.ExifIFD.Contrast,
    piexif.ExifIFD.Saturation, piexif.ExifIFD.Sharpness,
  ]);

  const TIMESTAMP_0TH  = new Set([piexif.ImageIFD.DateTime]);
  const TIMESTAMP_EXIF = new Set([
    piexif.ExifIFD.DateTimeOriginal, piexif.ExifIFD.DateTimeDigitized,
    piexif.ExifIFD.SubSecTimeOriginal, piexif.ExifIFD.SubSecTimeDigitized,
    piexif.ExifIFD.SubSecTime,
  ]);

  const AUTHOR_0TH  = new Set([
    piexif.ImageIFD.Artist, piexif.ImageIFD.Copyright, piexif.ImageIFD.ImageDescription,
  ]);
  const AUTHOR_EXIF = new Set([piexif.ExifIFD.UserComment]);

  const SOFTWARE_0TH = new Set([
    piexif.ImageIFD.Software, piexif.ImageIFD.HostComputer, piexif.ImageIFD.ProcessingSoftware,
  ]);

  function keep0th(tag: number) {
    if (ALWAYS_0TH.has(tag)) return true;
    if (keptGroups.has('camera')     && CAMERA_0TH.has(tag))    return true;
    if (keptGroups.has('timestamps') && TIMESTAMP_0TH.has(tag)) return true;
    if (keptGroups.has('author')     && AUTHOR_0TH.has(tag))    return true;
    if (keptGroups.has('software')   && SOFTWARE_0TH.has(tag))  return true;
    return false;
  }

  function keepExif(tag: number) {
    if (keptGroups.has('camera')     && CAMERA_EXIF.has(tag))    return true;
    if (keptGroups.has('timestamps') && TIMESTAMP_EXIF.has(tag)) return true;
    if (keptGroups.has('author')     && AUTHOR_EXIF.has(tag))    return true;
    return false;
  }

  for (const [tag, val] of Object.entries(original['0th'] ?? {})) {
    if (keep0th(Number(tag))) out['0th']![Number(tag)] = val;
  }
  for (const [tag, val] of Object.entries(original['Exif'] ?? {})) {
    if (keepExif(Number(tag))) out['Exif']![Number(tag)] = val;
  }

  return out;
}

export async function stripSelectedGroups(
  file: File,
  groupsToRemove: Set<string>,
): Promise<Blob> {
  const { stripMetadata } = await import('./stripMetadata');
  const cleanedBlob = await stripMetadata(file);

  const isJpeg = file.type === 'image/jpeg' || file.type === 'image/jpg';
  const keptGroups = new Set(['gps', 'camera', 'timestamps', 'author', 'software', 'other']
    .filter((g) => !groupsToRemove.has(g)));

  // For non-JPEG or "strip all": canvas re-encode already stripped everything
  if (!isJpeg || keptGroups.size === 0) return cleanedBlob;

  // JPEG selective: write back kept groups using piexifjs
  try {
    const piexif = (await import('piexifjs')).default as typeof piexifType;
    const originalBuf = await blobToArrayBuffer(file);
    const originalBin = arrayBufferToBinaryString(originalBuf);
    const originalExif = piexif.load(originalBin);

    const keptExif = buildKeptExif(originalExif, keptGroups, piexif);
    const exifStr = piexif.dump(keptExif);
    const cleanedDataUrl = await blobToDataUrl(cleanedBlob);
    const resultDataUrl = piexif.insert(exifStr, cleanedDataUrl);

    // Convert data URL back to Blob
    const base64 = resultDataUrl.split(',')[1];
    const binary = atob(base64);
    const u8 = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) u8[i] = binary.charCodeAt(i);
    return new Blob([u8], { type: 'image/jpeg' });
  } catch {
    // If piexif fails for any reason, return the fully stripped version
    return cleanedBlob;
  }
}
