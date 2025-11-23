import SubmissionForm from '@/components/SubmissionForm';
import { getAllUFOptions } from '@/lib/units';

export const metadata = {
  title: 'Reportar — Emendo',
  description: 'Submeta ineficiências nos Cuidados de Saúde Primários de forma anónima.',
};

export default function SubmitPage() {
  const ufOptions = getAllUFOptions();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Reportar
        </h1>
        <p className="text-neutral-700 mb-4">
          <strong>Esta plataforma é destinada a profissionais e colaboradores internos</strong> que trabalham
          nos Cuidados de Saúde Primários.
        </p>
        <p className="text-neutral-700">
          Submeta problemas operacionais, burocráticos e administrativos de forma anónima.
          As submissões ajudarão a identificar padrões sistémicos e pressionar por mudanças.
        </p>
      </div>

      <SubmissionForm ufOptions={ufOptions} />
    </div>
  );
}

