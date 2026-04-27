import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, CATEGORY_META, getPost, getRelatedPosts, type Block } from '@/lib/blog';
import { AdBanner } from '@/components/AdBanner';

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
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://imagepdf.tools/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, type: 'article' },
  };
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p
          className="text-base text-slate-700 dark:text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case 'h2':
      return (
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-10 mb-4 scroll-mt-20">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 mt-6 mb-2">
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul className="space-y-2.5 my-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="text-violet-500 mt-1.5 shrink-0 text-xs">●</span>
              <span
                className="text-base text-slate-700 dark:text-slate-300 leading-relaxed"
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
              <span className="text-violet-600 dark:text-violet-400 font-bold tabular-nums shrink-0 mt-0.5">
                {i + 1}.
              </span>
              <span
                className="text-base text-slate-700 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </li>
          ))}
        </ol>
      );
    case 'callout': {
      const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' } as const;
      const colors = {
        tip:     'bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-800/60 text-violet-800 dark:text-violet-300',
        warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300',
        info:    'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-300',
      } as const;
      const kind = block.kind ?? 'info';
      return (
        <div className={`my-6 flex gap-3 p-4 rounded-xl border text-sm leading-relaxed ${colors[kind]}`}>
          <span className="text-base shrink-0">{icons[kind]}</span>
          <p>{block.text}</p>
        </div>
      );
    }
    case 'code':
      return (
        <div className="my-6 rounded-xl overflow-hidden border border-slate-700">
          <div className="bg-slate-800 dark:bg-slate-900 px-4 py-2 text-[11px] text-slate-400 font-mono border-b border-slate-700 flex items-center gap-2">
            <span className="uppercase tracking-wider">{block.lang}</span>
          </div>
          <pre className="bg-slate-900 px-4 py-4 overflow-x-auto text-sm text-slate-100 font-mono leading-relaxed">
            <code>{block.text}</code>
          </pre>
        </div>
      );
    case 'ad':
      return (
        <div className="my-8">
          <AdBanner />
        </div>
      );
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

  return (
    <main className="flex-1 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Blog</Link>
          <span>/</span>
          <Link href={`/blog?category=${post.category}`} className={`${cat.color} hover:underline`}>
            {cat.label}
          </Link>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">

          {/* ── Article ── */}
          <article>
            {/* Header */}
            <header className="mb-8">
              <span className={`inline-flex text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${cat.color} ${cat.bg}`}>
                {cat.label}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-4">
                {post.title}
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 pb-6 border-b border-slate-200 dark:border-slate-700">
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
            <div className="mt-12 p-6 rounded-2xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/60">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">
                Ready to try it?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                All tools run entirely in your browser — no uploads, no account required.
              </p>
              <Link
                href={post.relatedTool.href}
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
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
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-50 mb-4">
                  More in {cat.label}
                </h2>
                <div className="space-y-3">
                  {related.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="group flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700 bg-white dark:bg-slate-800 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                          {rp.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{rp.readingTime} min read</p>
                      </div>
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            <div className="sticky top-24 space-y-6">

              {/* Tool widget */}
              <div className="bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/60 rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-700 dark:text-violet-400 mb-3">
                  Try the tool
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">
                  {post.relatedTool.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  100% in-browser — your files never leave your device.
                </p>
                <Link
                  href={post.relatedTool.href}
                  className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                >
                  Open Tool
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Sidebar ad */}
              <AdBanner />

              {/* All blog posts mini-list */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                  More Articles
                </p>
                <div className="space-y-3">
                  {POSTS.filter((p) => p.slug !== post.slug).slice(0, 5).map((p) => {
                    const c = CATEGORY_META[p.category];
                    return (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                        <span className={`text-[10px] font-semibold ${c.color}`}>{c.label}</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug mt-0.5">
                          {p.title}
                        </p>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/blog"
                  className="block text-center text-xs text-violet-600 dark:text-violet-400 hover:underline mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
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
