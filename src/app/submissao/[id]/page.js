import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubmissionById } from '@/lib/submissions';
import { getHierarchyBreadcrumb } from '@/lib/units';

export default async function SubmissionPage({ params }) {
  const { id } = await params;

  const submission = getSubmissionById(id);

  if (!submission) {
    notFound();
  }

  const breadcrumb = getHierarchyBreadcrumb({
    ars: submission.ars,
    uls: submission.uls,
    aces: submission.aces,
    uf: submission.uf
  });

  const date = new Date(submission.createdAt);
  const formattedDate = date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
      >
        ← Voltar
      </Link>

      {/* Submission header */}
      <div className="mb-8">
        {submission.title && (
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            {submission.title}
          </h1>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
          <Link
            href={`/s/${submission.ars}/${submission.uls}/${submission.aces}/${submission.uf}`}
            className="hover:text-neutral-900 transition-colors"
          >
            {submission.ufTitle}
          </Link>
          <span className="text-neutral-400">•</span>
          <time dateTime={submission.createdAt}>
            {formattedDate}
          </time>
          {submission.category && (
            <>
              <span className="text-neutral-400">•</span>
              <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                {submission.category}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Submission content */}
      <div className="prose prose-neutral max-w-none">
        <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
          <p className="text-neutral-900 whitespace-pre-wrap leading-relaxed">
            {submission.content}
          </p>
        </div>
      </div>

      {/* Breadcrumb at bottom */}
      <div className="mt-12 pt-8 border-t border-neutral-200">
        <p className="text-sm text-neutral-600 mb-2">Localização na hierarquia:</p>
        <nav className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-neutral-600">
            {breadcrumb.map((item, index) => (
              <li key={item.code} className="flex items-center gap-2">
                {index > 0 && <span className="text-neutral-400">/</span>}
                <Link
                  href={item.url}
                  className="hover:text-neutral-900 transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllSubmissions } = await import('@/lib/submissions');
  const submissions = getAllSubmissions();

  return submissions.map(submission => ({
    id: submission.id
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const submission = getSubmissionById(id);

  if (!submission) {
    return {
      title: 'Submissão não encontrada — Emendo'
    };
  }

  const title = submission.title
    ? `${submission.title} — ${submission.ufTitle}`
    : `Submissão — ${submission.ufTitle}`;

  return {
    title: `${title} — Emendo`,
    description: submission.content.substring(0, 160) + '...'
  };
}

