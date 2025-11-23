import Link from 'next/link';

export default function SubmissionCard({ submission }) {
  const date = new Date(submission.createdAt);
  const formattedDate = date.toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <article className="border border-neutral-200 rounded-lg p-6 hover:border-neutral-300 transition-colors">
      <div className="flex justify-between items-start gap-4 mb-3">
        <Link
          href={`/s/${submission.ars}/${submission.uls}/${submission.aces}/${submission.uf}`}
          className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {submission.ufTitle}
        </Link>
        <time className="text-sm text-neutral-500 whitespace-nowrap" dateTime={submission.createdAt.toISOString()}>
          {formattedDate}
        </time>
      </div>

      {submission.title && (
        <h3 className="font-medium text-neutral-900 mb-2">
          {submission.title}
        </h3>
      )}

      <p className="text-neutral-700 whitespace-pre-wrap line-clamp-3">
        {submission.content}
      </p>

      {submission.category && (
        <div className="mt-3">
          <span className="inline-block text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded">
            {submission.category}
          </span>
        </div>
      )}
    </article>
  );
}

