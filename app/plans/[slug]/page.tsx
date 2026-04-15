import { getArticle, getAllSlugs } from '@/lib/articles';
import ArticleLayout from '@/components/ArticleLayout';
import ArticleContent from '@/components/ArticleContent';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllSlugs('plans').map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle('plans', slug);
  return {
    title: article ? article.title : 'VitaTrack',
    description: article?.excerpt || '',
    alternates: { canonical: 'https://thevitatrack.com/plans/' + slug },
    openGraph: {
      title: article?.title,
      description: article?.excerpt || '',
      url: 'https://thevitatrack.com/plans/' + slug,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle('plans', slug);
  if (!article) notFound();
  return (
    <>
      <Header />
      <ArticleLayout title={article.title} category="plans" slug={slug} excerpt={article.excerpt}>
        <ArticleContent html={article.content} />
      </ArticleLayout>
    </>
  );
}
