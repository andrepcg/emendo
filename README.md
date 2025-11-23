# Emendo

**Do latim *emendo*: libertar de falhas, corrigir, curar.**

O **Emendo** é uma iniciativa *open-source* de cidadania digital destinada a identificar, reportar e mapear ineficiências sistémicas nos Cuidados de Saúde Primários (Centros de Saúde e USF).

**Esta plataforma é destinada a profissionais e colaboradores internos** que trabalham no terreno e identificam problemas operacionais, burocráticos e administrativos.

Nesta primeira fase, o nosso foco é absoluto e urgente: **os Cuidados de Saúde Primários (Centros de Saúde).**

## 🏥 O Problema

Os profissionais de saúde e administrativos que trabalham nos Centros de Saúde e USF enfrentam diariamente obstáculos sistémicos que dificultam o seu trabalho:

* **Burocracia Paralisante:** Processos administrativos que requerem múltiplas aprovações para tarefas simples.
* **Falta de Recursos:** Equipamentos avariados há semanas, sistemas informáticos obsoletos, infraestruturas degradadas.
* **Problemas de Staffing:** Falta de contratações, distribuição inadequada de pessoal, utentes sem médico de família atribuído.
* **Ineficiências Operacionais:** Processos lentos que envolvem múltiplas pessoas para resolver questões simples.

## 💡 A Missão do Emendo

Não somos um livro de reclamações externo; somos uma **ferramenta de diagnóstico interno**.

O Emendo permite que **profissionais e colaboradores** submetam falhas de processo de forma rápida, estruturada e **anónima**. Agregamos estes dados para criar um "mapa de calor" da ineficiência operacional, transformando relatos anedóticos em estatísticas acionáveis. O objetivo não é apenas expor o problema, mas fornecer os dados necessários — **por quem trabalha no sistema** — para forçar a **cura**.

## 🛠️ Como funciona

A plataforma foca-se nos problemas operacionais identificados pelos profissionais:
1.  **Submissão Rápida e Anónima:** O profissional sinaliza a ineficiência (ex: "Equipamento X avariado há 3 semanas sem resposta da manutenção").
2.  **Associação à Unidade:** Cada problema é associado à USF/ACES específica.
3.  **Visualização:** Um dashboard público que mostra quais as unidades com maiores índices de problemas sistémicos.

---

## 🚀 Tech Stack

- **Next.js 16** - Static site generation
- **Tailwind CSS 4** - Styling
- **Cloudflare Pages** - Hosting and serverless functions
- **Cloudflare Turnstile** - Bot protection
- **GitHub** - Content storage and version control

## 📦 Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/andrepcg/emendo.git
cd emendo

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Environment Variables

You'll need to set up:

1. **Cloudflare Turnstile** - Get keys from https://dash.cloudflare.com/turnstile
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (public)
   - `TURNSTILE_SECRET_KEY` (secret, for CF Functions)

2. **GitHub Integration** - Create a Personal Access Token with `repo` scope
   - `GITHUB_REPO_OWNER`
   - `GITHUB_REPO_NAME`
   - `GITHUB_TOKEN`

For local testing, use Cloudflare's test keys (see `.env.example`).

## 🚢 Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
3. Add environment variables in Cloudflare Pages settings
4. Deploy!

The site will automatically rebuild when:
- New code is pushed to the repository
- A submission PR is merged

## 📁 Project Structure

```
emendo/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.js            # Homepage
│   │   ├── sobre/             # About page
│   │   ├── submeter/          # Submit form
│   │   └── s/[...path]/       # Hierarchical unit pages
│   ├── components/            # React components
│   ├── lib/                   # Utility functions
│   └── data/                  # Healthcare units data
├── content/
│   └── submissions/           # Submission markdown files
├── functions/
│   └── api/
│       └── submit.js          # CF Pages function for submissions
└── public/                    # Static assets
```

## 📝 How Submissions Work

1. Professional/staff member fills out the submission form on `/submeter`
2. Form is protected by Cloudflare Turnstile
3. On submit, the data is sent to the Cloudflare Pages Function (`/functions/api/submit.js`)
4. The function:
   - Validates the Turnstile token
   - Creates a new branch in the GitHub repository
   - Adds a markdown file with the submission
   - Opens a pull request
5. Maintainers review and merge the PR
6. Site automatically rebuilds with the new submission

## 🤝 Contribuir

Este é um projeto de código cívico. Se és developer, designer, data scientist ou profissional de saúde que acredita num SNS mais eficiente, precisamos de ti.

### Como Contribuir

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Issues

Check out the [Issues](https://github.com/andrepcg/emendo/issues) to see where you can help.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Vamos "emendar" o sistema, um *commit* de cada vez.**
