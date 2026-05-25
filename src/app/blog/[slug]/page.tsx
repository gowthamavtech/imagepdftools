import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, CATEGORY_META, getPost, getRelatedPosts, type Block } from '@/lib/blog';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const BASE = 'https://imagepdf.tools';
  const postUrl = `${BASE}/blog/${post.slug}`;
  const ogImage = { url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: post.title };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: postUrl,
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${BASE}/og-image.png`],
    },
  };
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p
          className="text-[13.5px] text-fg-2 leading-[1.75]"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case 'h2':
      return (
        <h2 className="serif italic text-fg-1 m-0 mt-10 mb-3 scroll-mt-20" style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-[15px] font-semibold text-fg-1 mt-6 mb-2">
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul className="space-y-2.5 my-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="text-accent mt-1.5 shrink-0 text-xs">●</span>
              <span
                className="text-[13.5px] text-fg-2 leading-[1.75]"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-2.5 my-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-accent font-bold tabular-nums shrink-0 mt-0.5 text-[13.5px]">
                {i + 1}.
              </span>
              <span
                className="text-[13.5px] text-fg-2 leading-[1.75]"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </ol>
      );
    case 'callout': {
      const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' } as const;
      const kind = block.kind ?? 'info';
      const isWarning = kind === 'warning';
      return (
        <div className={`my-6 flex gap-3 p-4 rounded-[10px] bd-2 text-[13px] leading-relaxed ${isWarning ? 'bg-surface text-fg-2' : 'bg-accent-dim text-fg-1'}`}>
          <span className="text-base shrink-0">{icons[kind]}</span>
          <p>{block.text}</p>
        </div>
      );
    }
    case 'code':
      return (
        <div className="my-6 rounded-[10px] overflow-x-auto overflow-hidden bd-2">
          <div className="bg-slate-800 px-4 py-2 text-[11px] text-slate-400 font-mono border-b border-slate-700 flex items-center gap-2">
            <span className="uppercase tracking-wider">{block.lang}</span>
          </div>
          <pre className="bg-slate-900 px-4 py-4 overflow-x-auto text-[13px] text-slate-100 font-mono leading-relaxed">
            <code>{block.text}</code>
          </pre>
        </div>
      );
    case 'table':
      return (
        <figure className="my-8 overflow-x-auto rounded-[10px] bd-2">
          <table style={{ minWidth: '460px' }} className="w-full text-[13px] text-left">
            <thead className="bg-surface">
              <tr>
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-medium text-fg-2 text-[11px] uppercase tracking-wide bd-b-1 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="bd-t-1">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 text-fg-2 leading-snug"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="px-4 py-2 text-[11px] text-fg-3 bg-surface bd-t-1 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'image':
      return (
        <figure className="my-8">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-[10px] bd-2"
            loading="lazy"
            decoding="async"
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-[11px] text-fg-3 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'image-group': {
      const cols = block.columns ?? 2;
      return (
        <div className={`my-8 grid gap-4 ${cols === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {block.images.map((img, i) => (
            <figure key={i}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full rounded-[10px] bd-2"
                loading="lazy"
                decoding="async"
              />
              {img.caption && (
                <figcaption className="mt-1.5 text-center text-[11px] text-fg-3 italic">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      );
    }
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const cat     = CATEGORY_META[post.category];
  const related = getRelatedPosts(post, 3);

  const BASE = 'https://imagepdf.tools';
  const postUrl = `${BASE}/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        image: `${BASE}/og-image.png`,
        datePublished: post.date,
        dateModified: post.updatedDate ?? post.date,
        url: postUrl,
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        author: { '@type': 'Person', name: 'Arjun from ImagePDF', url: `${BASE}/about` },
        publisher: {
          '@type': 'Organization',
          name: 'ImagePDF.Tools',
          url: BASE,
          logo: { '@type': 'ImageObject', url: `${BASE}/icon.svg`, width: 512, height: 512 },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
          { '@type': 'ListItem', position: 3, name: cat.label, item: `${BASE}/blog?category=${post.category}` },
          { '@type': 'ListItem', position: 4, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <main className="bg-page text-fg-1" style={{ padding: 'clamp(40px, 5vw, 72px) 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-fg-3 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <span>/</span>
          <Link href={`/blog?category=${post.category}`} className="text-accent hover:underline">
            {cat.label}
          </Link>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">

          {/* ── Article ── */}
          <article>
            {/* Header */}
            <header className="mb-8">
              <span className="inline-flex text-[11px] font-semibold px-3 py-1.5 rounded-full mb-4 bg-accent-dim text-accent">
                {cat.label}
              </span>
              <h1 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                {post.title}
              </h1>
              <p className="text-[14px] text-fg-2 leading-[1.7] mb-5">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-[12px] text-fg-3 pb-6 bd-b-1">
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>·</span>
                <span>{post.readingTime} min read</span>
                <span>·</span>
                <span>ImagePDF.Tools</span>
              </div>
            </header>

            {/* Body */}
            <div className="space-y-5">
              {post.body.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 p-6 rounded-[14px] bg-accent-dim bd-accent">
              <p className="text-[15px] font-semibold text-fg-1 mb-1">
                Ready to try it?
              </p>
              <p className="text-[13px] text-fg-2 mb-4">
                All tools run entirely in your browser — no uploads, no account required.
              </p>
              <Link
                href={post.relatedTool.href}
                className="inline-flex items-center gap-2 text-[13.5px] font-medium text-accent bd-accent hover:bg-surface px-5 py-2.5 rounded-[10px] transition-colors"
              >
                {post.relatedTool.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="serif italic text-fg-1 m-0 mb-4" style={{ fontSize: 'clamp(21px, 3vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  More in {cat.label}
                </h2>
                <div className="space-y-3">
                  {related.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="group flex items-start gap-3 p-4 rounded-[10px] bd-2 bg-surface hover:bd-accent transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-semibold text-fg-1 group-hover:text-accent transition-colors line-clamp-1">
                          {rp.title}
                        </p>
                        <p className="text-[12px] text-fg-3 mt-0.5">{rp.readingTime} min read</p>
                      </div>
                      <svg className="w-4 h-4 text-fg-3 group-hover:text-accent transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">

              {/* Tool widget */}
              <div className="bg-accent-dim bd-accent rounded-[14px] p-5">
                <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-accent mb-3">
                  Try the tool
                </p>
                <p className="text-[14px] font-semibold text-fg-1 mb-1">
                  {post.relatedTool.label}
                </p>
                <p className="text-[12.5px] text-fg-2 mb-4 leading-relaxed">
                  100% in-browser — your files never leave your device.
                </p>
                <Link
                  href={post.relatedTool.href}
                  className="flex items-center justify-center gap-2 w-full text-[13.5px] font-medium text-accent bd-accent hover:bg-surface py-2.5 rounded-[10px] transition-colors"
                >
                  Open Tool
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* All blog posts mini-list */}
              <div className="bg-surface bd-2 rounded-[14px] p-5">
                <p className="font-data text-[11px] font-medium tracking-[0.16em] uppercase text-fg-3 mb-4">
                  More Articles
                </p>
                <div className="space-y-4">
                  {POSTS.filter((p) => p.slug !== post.slug).slice(0, 5).map((p) => {
                    const c = CATEGORY_META[p.category];
                    return (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                        <span className="text-[10px] font-semibold text-accent">{c.label}</span>
                        <p className="text-[12.5px] text-fg-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug mt-0.5">
                          {p.title}
                        </p>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/blog"
                  className="block text-center text-[12px] text-accent hover:underline mt-4 pt-4 bd-t-1"
                >
                  View all posts →
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
