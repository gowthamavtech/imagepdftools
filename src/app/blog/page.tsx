import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS, CATEGORY_META, type Category } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guides on image compression, PDF tools, web performance, and privacy — written by the engineers behind ImagePDF.Tools.',
  alternates: { canonical: 'https://imagepdf.tools/blog' },
};

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all',         label: 'All Posts' },
  { value: 'privacy',     label: 'Privacy & Security' },
  { value: 'performance', label: 'Performance & SEO' },
  { value: 'productivity',label: 'Productivity' },
  { value: 'technical',   label: 'Technical' },
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

  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">Blog</h1>
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Guides on image compression, PDF tools, web performance, and privacy — written by
            engineers who build these tools.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {CATEGORIES.map(({ value, label }) => {
            const active = value === 'all' ? !selectedCategory : selectedCategory === value;
            const href   = value === 'all' ? '/blog' : `/blog?category=${value}`;
            return (
              <Link
                key={value}
                href={href}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                  active
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Post grid */}
        {sorted.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((post) => {
              const cat = CATEGORY_META[post.category];
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all"
                >
                  <span className={`inline-flex w-fit text-[11px] font-semibold px-2.5 py-1 rounded-full mb-4 ${cat.color} ${cat.bg}`}>
                    {cat.label}
                  </span>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1 line-clamp-3 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
