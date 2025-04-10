import {json, error} from '@sveltejs/kit'
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private'

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

async function getSpotifyToken() {
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
        return accessToken;
    }

    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);


 try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      console.error('Error fetching Spotify token:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + (data.expires_in * 1000) - (60 * 1000); // Subtract a minute for safety
    return accessToken;

  } catch (err) {
    console.error('Error fetching Spotify token:', err);
    return null;
  }
}

export async function GET() {
  const token = await getSpotifyToken();
  if (token) {
    return json({ accessToken: token });
  } else {
    return error(500, 'Failed to retrieve Spotify access token');
  }
}