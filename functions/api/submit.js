/**
 * Cloudflare Pages Function to handle submission
 * This function will create a GitHub PR with the new submission
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    // Validate Turnstile token
    const turnstileResult = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: body.turnstileToken,
        }),
      }
    );

    const turnstileData = await turnstileResult.json();

    if (!turnstileData.success) {
      return new Response(
        JSON.stringify({ error: 'Falha na verificação de segurança' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse unit path
    const [ars, uls, aces, uf] = body.unit.split('/');

    // Get unit information from the units data
    // We'll need to fetch this or have it available
    const unitsResponse = await fetch(`${new URL(request.url).origin}/config/units.json`);
    const unitsData = await unitsResponse.json();

    const ufEntity = unitsData.UFList.find(u => u.Code === parseInt(uf));
    const acesEntity = unitsData.ACESList.find(u => u.Code === parseInt(aces));
    const ulsEntity = unitsData.ULSList.find(u => u.Code === parseInt(uls));
    const arsEntity = unitsData.ARSList.find(u => u.Code === parseInt(ars));

    // Generate submission ID (timestamp-based)
    const submissionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const createdAt = new Date().toISOString();

    // Create markdown content with front matter
    const markdownContent = `---
id: ${submissionId}
createdAt: ${createdAt}
ars: ${ars}
uls: ${uls}
aces: ${aces}
uf: ${uf}
arsTitle: ${arsEntity?.Title || ''}
ulsTitle: ${ulsEntity?.Title || ''}
acesTitle: ${acesEntity?.Title || ''}
ufTitle: ${ufEntity?.Title || ''}
category: ${body.category}
title: ${body.title || ''}
---

${body.description}
`;

    // Create GitHub PR using GitHub API
    const githubToken = env.GITHUB_TOKEN;
    const repoOwner = env.GITHUB_REPO_OWNER;
    const repoName = env.GITHUB_REPO_NAME;
    const baseBranch = 'main';
    const newBranch = `submission-${submissionId}`;
    const filePath = `content/submissions/${submissionId}.md`;

    // Get the base branch reference
    const refResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/${baseBranch}`,
      {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!refResponse.ok) {
      throw new Error('Failed to get base branch reference');
    }

    const refData = await refResponse.json();
    const baseSha = refData.object.sha;

    // Create new branch
    const createBranchResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: `refs/heads/${newBranch}`,
          sha: baseSha,
        }),
      }
    );

    if (!createBranchResponse.ok) {
      throw new Error('Failed to create branch');
    }

    // Create/update file in the new branch
    const createFileResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Nova submissão: ${body.category} - ${ufEntity?.Title || 'Unidade'}`,
          content: btoa(unescape(encodeURIComponent(markdownContent))),
          branch: newBranch,
          committer: {
            name: 'Emendo Bot',
            email: 'bot@emendo.pt'
          },
          author: {
            name: 'Emendo Bot',
            email: 'bot@emendo.pt'
          }
        }),
      }
    );

    if (!createFileResponse.ok) {
      throw new Error('Failed to create file');
    }

    // Create pull request
    const prResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/pulls`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Novo reporte: ${body.category}`,
          body: `**Unidade:** ${ufEntity?.Title || 'N/A'}\n**Categoria:** ${body.category}\n\nReporte submetido através da plataforma Emendo.`,
          head: newBranch,
          base: baseBranch,
        }),
      }
    );

    if (!prResponse.ok) {
      throw new Error('Failed to create pull request');
    }

    const prData = await prResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        submissionId,
        prUrl: prData.html_url,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Submission error:', error);
    return new Response(
      JSON.stringify({
        error: 'Erro ao processar a submissão. Por favor, tente novamente.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

