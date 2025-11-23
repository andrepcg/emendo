/**
 * Alternative Cloudflare Pages Function using GitHub Actions
 * This triggers a GitHub Action via repository_dispatch event
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

    // Trigger GitHub Action via repository_dispatch
    const githubToken = env.GITHUB_TOKEN;
    const repoOwner = env.GITHUB_REPO_OWNER;
    const repoName = env.GITHUB_REPO_NAME;

    const dispatchResponse = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'new-submission',
          client_payload: {
            submission_id: submissionId,
            submission_data: markdownContent,
            category: body.category,
            uf_title: ufEntity?.Title || 'N/A',
            bot_author: {
              name: 'Emendo Bot',
              email: 'bot@emendo.pt'
            }
          },
        }),
      }
    );

    if (!dispatchResponse.ok) {
      throw new Error('Failed to trigger GitHub Action');
    }

    return new Response(
      JSON.stringify({
        success: true,
        submissionId,
        message: 'Reporte submetido com sucesso. Será revisto em breve.',
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

