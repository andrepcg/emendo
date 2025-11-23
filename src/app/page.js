import Link from 'next/link';
import SubmissionCard from '@/components/SubmissionCard';
import { getAllSubmissions } from '@/lib/submissions';
import { getAllARS } from '@/lib/units';

export default function HomePage() {
  const submissions = getAllSubmissions().slice(0, 10); // Show latest 10
  const regions = getAllARS();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          Emendo
        </h1>
        <p className="text-lg text-neutral-700 mb-6">
          Plataforma para profissionais de saúde e colaboradores dos CSP reportarem ineficiências operacionais e burocráticas de forma anónima.
        </p>
        <div className="flex gap-4">
          <Link
            href="/submeter"
            className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
          >
            Reportar
          </Link>
          <Link
            href="/sobre"
            className="inline-block px-6 py-3 border border-neutral-300 text-neutral-900 rounded-lg hover:border-neutral-400 transition-colors font-medium"
          >
            Saber Mais
          </Link>
        </div>
      </section>

      {/* Browse by Region */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Navegar por Região
        </h2>
        <div className="grid gap-4">
          {regions.map(region => (
            <Link
              key={region.Code}
              href={`/s/${region.Code}`}
              className="block p-6 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:bg-white transition-all"
            >
              <h3 className="font-medium text-neutral-900">
                {region.Title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Submissions */}
      {submissions.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">
            Submissões Recentes
          </h2>
          <div className="grid gap-6">
            {submissions.map(submission => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
        </section>
      )}

      {submissions.length === 0 && (
        <section>
          <div className="text-center py-16 border border-dashed border-neutral-300 rounded-lg">
            <p className="text-neutral-600 mb-4">
              Ainda não há submissões submetidas.
            </p>
            <Link
              href="/submeter"
              className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
            >
              Seja o Primeiro a Submeter
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
