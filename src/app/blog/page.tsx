import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS, CATEGORY_META, type Category } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Image Compression, PDF Tools & Web Performance Guides',
  description: 'Practical guides on image compression, PDF tools, web performance, and file privacy — written by the engineers behind ImagePDF.Tools.',
  alternates: { canonical: 'https://imagepdf.tools/blog' },
  openGraph: {
    title: 'Blog — Image Compression, PDF Tools & Web Performance Guides',
    description: 'Practical guides on image compression, PDF tools, web performance, and file privacy — written by the engineers behind ImagePDF.Tools.',
    type: 'website',
    url: 'https://imagepdf.tools/blog',
    images: [{ url: 'https://imagepdf.tools/og-image.png', width: 1200, height: 630, alt: 'ImagePDF.Tools Blog' }],
  },
  twitter: { card: 'summary_large_image' },
};

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all',          label: 'All Posts' },
  { value: 'privacy',      label: 'Privacy & Security' },
  { value: 'performance',  label: 'Performance & SEO' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'technical',    label: 'Technical' },
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: rawCategory } = await searchParams;
  const selectedCategory = rawCategory as Category | undefined;

  const posts = selectedCategory
    ? POSTS.filter((p) => p.category === selectedCategory)
    : POSTS;

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const allSorted = [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const featuredPost = !selectedCategory && sorted.length > 0 ? sorted[0] : null;
  const gridPosts    = featuredPost ? sorted.slice(1) : sorted;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ImagePDF.Tools Blog',
    description: 'Guides on image compression, PDF tools, web performance, and privacy.',
    url: 'https://imagepdf.tools/blog',
    numberOfItems: POSTS.length,
    itemListElement: allSorted.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `https://imagepdf.tools/blog/${p.slug}`,
    })),
  };

  return (
    <main className="bg-page text-fg-1 relative overflow-hidden" style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
      <div aria-hidden="true" className="absolute pointer-events-none" style={{ right: '-10%', top: '-10%', width: 'min(900px, 100vw)', height: 'min(600px, 100vw)', background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)', filter: 'blur(48px)', opacity: 0.5 }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 relative z-[1]">

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <span data-animate="hero" className="hp-eyebrow">Blog</span>
          <h1 data-animate="hero" className="serif italic text-fg-1 m-0 mb-3" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Guides &amp; deep-dives.
          </h1>
          <p data-animate="hero" className="text-[13.5px] text-fg-2 leading-[1.7] m-0">
            Image compression, PDF tools, web performance, and privacy — written by engineers who build these tools.
          </p>
        </div>

        {/* Category filter + count */}
        <div data-animate="scroll" className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(({ value, label }) => {
              const active = value === 'all' ? !selectedCategory : selectedCategory === value;
              const href   = value === 'all' ? '/blog' : `/blog?category=${value}`;
              return (
                <Link
                  key={value}
                  href={href}
                  className={`text-[12px] font-semibold px-4 py-2 rounded-full bd-2 transition-colors ${
                    active
                      ? 'bg-accent-dim bd-accent text-accent'
                      : 'bg-surface text-fg-2 hover:text-accent hover:bd-accent'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <span className="font-data text-[11px] uppercase tracking-[0.12em] text-fg-3 shrink-0">
            {sorted.length} {sorted.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Posts */}
        {sorted.length === 0 ? (
          <p className="text-[13.5px] text-fg-2">No posts in this category yet.</p>
        ) : (
          <>
            {/* Featured post — latest when no filter active */}
            {featuredPost && (() => {
              const fp   = featuredPost;
              const fcat = CATEGORY_META[fp.category];
              return (
                <Link
                  href={`/blog/${fp.slug}`}
                  className="group flex flex-col sm:flex-row gap-6 bg-surface bd-2 rounded-[14px] p-6 mb-5 hover:bd-accent transition-colors"
                >
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent-dim text-accent">
                          {fcat.label}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-page bd-2 text-fg-3">
                          Latest
                        </span>
                      </div>
                      <h2
                        className="serif italic text-fg-1 m-0 mb-3 group-hover:text-accent transition-colors"
                        style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
                      >
                        {fp.title}
                      </h2>
                      <p className="text-[13px] text-fg-2 leading-[1.7] line-clamp-2">{fp.description}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-5 text-[11px] text-fg-3">
                      <span>
                        {new Date(fp.date).toLocaleDateString('en-US', {
                          month: 'long', day: 'numeric', year: 'numeric',
                        })}
                      </span>
                      <span>·</span>
                      <span>{fp.readingTime} min read</span>
                      <span className="ml-auto text-[12px] font-medium text-accent group-hover:underline">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })()}

            {/* Post grid */}
            <div data-animate-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {gridPosts.map((post) => {
                const cat = CATEGORY_META[post.category];
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-surface bd-2 rounded-[10px] p-6 hover:bd-accent transition-colors"
                  >
                    <span className="inline-flex w-fit text-[11px] font-semibold px-2.5 py-1 rounded-full mb-4 bg-accent-dim text-accent">
                      {cat.label}
                    </span>
                    <p className="text-[13.5px] font-bold text-fg-1 mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                    <p className="text-[12.5px] text-fg-2 leading-[1.65] flex-1 line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-fg-3">
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
