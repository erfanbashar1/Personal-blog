import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  // For Decap CMS authentication, we're using GitHub's OAuth
  // This endpoint handles the callback from GitHub OAuth

  if (body.token) {
    // If a token is provided, validate it with GitHub
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${body.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.ok) {
        const user = await response.json();
        return new Response(JSON.stringify({
          email: user.email || user.login,
          name: user.name || user.login,
          image: user.avatar_url,
          token: body.token
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  }

  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const GET: APIRoute = async ({ url }) => {
  // This endpoint can be used for OAuth callback handling
  // Decap CMS will use implicit flow or fetch tokens from here

  const token = url.searchParams.get('token');

  if (token) {
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ error: 'No token provided' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
};
