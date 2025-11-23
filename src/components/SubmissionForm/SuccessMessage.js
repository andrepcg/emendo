'use client';

import { useRouter } from 'next/navigation';

export default function SuccessMessage({ prUrl, unitPath }) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-lg font-medium text-green-900">
              Submissão recebida com sucesso!
            </h3>
            <div className="mt-3 text-sm text-green-800 space-y-2">
              <p>
                A sua submissão foi recebida e será analisada pela equipa de moderação antes de aparecer publicamente. Este processo garante a qualidade e relevância das submissões.
              </p>
              {prUrl && (
                <p>
                  Pode acompanhar o estado da revisão através do{' '}
                  <a
                    href={prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline hover:text-green-900"
                  >
                    pull request no GitHub
                  </a>.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push(`/s/${unitPath}`)}
          className="btn-primary flex-1"
        >
          Ver Unidade
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn-secondary"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}

