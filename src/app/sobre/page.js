export const metadata = {
  title: 'Sobre o Emendo - Iniciativa de Cidadania Digital',
  description: 'O Emendo é uma iniciativa open-source de cidadania digital destinada a identificar, reportar e mapear ineficiências sistémicas nos Cuidados de Saúde Primários.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-neutral-900 mb-8">
        Sobre o Emendo
      </h1>

      <div className="prose prose-neutral max-w-none">
        <p className="text-lg text-neutral-700 mb-6">
          <strong>Do latim <em>emendo</em>: libertar de falhas, corrigir, curar.</strong>
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            O que é o Emendo?
          </h2>
          <p className="text-neutral-700 mb-4">
            O <strong>Emendo</strong> é uma iniciativa <em>open-source</em> de cidadania digital destinada a identificar,
            reportar e mapear ineficiências sistémicas nos Cuidados de Saúde Primários (Centros de Saúde e USF).
          </p>
          <p className="text-neutral-700 mb-4">
            <strong>Esta plataforma é destinada a profissionais e colaboradores internos</strong> do SNS que trabalham
            no terreno e identificam problemas operacionais, burocráticos e administrativos que afetam o funcionamento
            das unidades de saúde.
          </p>
          <p className="text-neutral-700">
            Nesta primeira fase, o nosso foco é absoluto e urgente: <strong>os Cuidados de Saúde Primários.</strong>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            🏥 O Problema
          </h2>
          <p className="text-neutral-700 mb-4">
            Os profissionais de saúde e administrativos que trabalham nos Centros de Saúde e USF enfrentam diariamente
            obstáculos sistémicos que dificultam o seu trabalho e a prestação de cuidados de qualidade.
          </p>
          <p className="text-neutral-700 mb-2">
            Problemas recorrentes identificados pelos profissionais:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-4">
            <li>
              <strong>Burocracia Paralisante:</strong> Processos administrativos que requerem múltiplas aprovações
              e validações para tarefas simples.
            </li>
            <li>
              <strong>Falta de Recursos:</strong> Equipamentos avariados há semanas, sistemas informáticos obsoletos,
              infraestruturas degradadas.
            </li>
            <li>
              <strong>Problemas de Staffing:</strong> Falta de contratações, distribuição inadequada de pessoal,
              utentes sem médico de família atribuído.
            </li>
            <li>
              <strong>Ineficiências Operacionais:</strong> Processos lentos que envolvem múltiplas pessoas para
              resolver questões simples.
            </li>
            <li>
              <strong>Falta de Comunicação:</strong> Informação que não circula adequadamente entre equipas e
              departamentos.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            💡 A Missão do Emendo
          </h2>
          <p className="text-neutral-700 mb-4">
            Não somos um livro de reclamações externo; somos uma <strong>ferramenta de diagnóstico interno</strong>.
          </p>
          <p className="text-neutral-700 mb-4">
            O Emendo permite que <strong>profissionais e colaboradores</strong> submetam falhas de processo de
            forma rápida, estruturada e <strong>anónima</strong>. Agregamos estes dados para criar um "mapa de calor"
            da ineficiência operacional, transformando relatos anedóticos em estatísticas acionáveis.
          </p>
          <p className="text-neutral-700">
            O objetivo não é apenas expor o problema, mas fornecer os dados necessários — <strong>por quem trabalha
            no sistema</strong> — para forçar mudanças e melhorias concretas.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            🛠️ Como Funciona
          </h2>
          <p className="text-neutral-700 mb-2">
            A plataforma foca-se nos problemas operacionais identificados pelos profissionais:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-neutral-700">
            <li>
              <strong>Submissão Rápida e Anónima:</strong> O profissional sinaliza a ineficiência (ex: "Equipamento
              X avariado há 3 semanas sem resposta do departamento de manutenção").
            </li>
            <li>
              <strong>Associação à Unidade:</strong> Cada problema é associado à USF/ACES específica.
            </li>
            <li>
              <strong>Visualização Pública:</strong> Um dashboard transparente que mostra os problemas sistémicos
              por unidade, criando pressão para resolução.
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            🔒 Privacidade e Anonimato
          </h2>
          <p className="text-neutral-700 mb-4">
            <strong>Todas as submissões são completamente anónimas.</strong> Não recolhemos qualquer informação
            que possa identificar quem submeteu. Não há login, não há registo, não há tracking.
          </p>
          <p className="text-neutral-700">
            O objetivo é criar um espaço seguro onde profissionais possam reportar problemas sem receio de
            retaliação ou exposição.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            🤝 Contribuir
          </h2>
          <p className="text-neutral-700 mb-4">
            Este é um projeto de código cívico. Se és developer, designer, data scientist ou profissional de
            saúde que acredita num SNS mais eficiente, precisamos de ti.
          </p>
          <p className="text-neutral-700">
            O código fonte está disponível no{' '}
            <a
              href="https://github.com/andrepcg/emendo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline hover:no-underline"
            >
              GitHub
            </a>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            👨‍💻 Autor
          </h2>
          <p className="text-neutral-700">
            O Emendo foi criado por{' '}
            <a
              href="https://github.com/andrepcg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline hover:no-underline font-medium"
            >
              André Perdigão
            </a>
            , engenheiro de software e entusiasta de projetos de código cívico.
          </p>
        </section>

        <section className="pt-8 border-t border-neutral-200">
          <p className="text-neutral-700 font-medium">
            Vamos "emendar" o sistema, um <em>commit</em> de cada vez.
          </p>
        </section>
      </div>
    </div>
  );
}
