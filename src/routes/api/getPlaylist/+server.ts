// src/routes/api/getPlaylist/+server.ts
import { json, error } from '@sveltejs/kit';
import { getAppAccessToken } from '$lib/server/spotifyAuth';
import type { RequestEvent } from './$types';

export async function GET(event: RequestEvent) {
    const {url} = event;
    const id = url.searchParams.get('id');
    const accessToken = await getAppAccessToken();

    if (!accessToken) {
        return error(500, 'Could not retrieve Spotify access token');
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });

        if (!response.ok) {
        console.error('Spotify API Error:', response.status, await response.text());
        return error(500, 'Failed to fetch new releases from Spotify');
        }

        const data = await response.json();
        return json(data);

    } catch (err) {
        console.error('Error fetching Spotify data:', err);
        return error(500, 'Internal server error');
    }
}