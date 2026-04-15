import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface ArticleMeta {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        title: data.title || filename,
        slug: data.slug || filename.replace('.mdx', ''),
        category: data.category || category,
        excerpt: data.excerpt || '',
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getArticle(category: string, slug: string): Article | null {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return null;
  for (const filename of fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))) {
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
    const { data, content } = matter(raw);
    const fileSlug = data.slug || filename.replace('.mdx', '');
    if (fileSlug === slug) {
      return { title: data.title || slug, slug: fileSlug, category, excerpt: data.excerpt || '', content };
    }
  }
  return null;
}

export function getAllSlugs(category: string): string[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data } = matter(raw);
      return data.slug || f.replace('.mdx', '');
    });
}
