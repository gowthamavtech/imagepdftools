declare module 'upng-js' {
  const UPNG: {
    encode(imgs: ArrayBuffer[], w: number, h: number, cnum: number): ArrayBuffer;
    decode(buf: ArrayBuffer): { width: number; height: number; data: ArrayBuffer };
    toRGBA8(out: { width: number; height: number; data: ArrayBuffer }): ArrayBuffer[];
  };
  export default UPNG;
}
