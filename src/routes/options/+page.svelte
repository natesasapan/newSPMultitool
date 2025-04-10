<script lang="ts">
	import { goto } from '$app/navigation';

    let isVisible = false;
    let givenLink = '';
    let finalLink = '';
    let isLoading = false;
    let errorState = '';
    let successState = '';
    let playlistName = '';
    let playlistImgSrc = '';

	function navigateTo(path: string) {
		goto(path);
	}

    function parseURL(url: string) {
        return url.split('/playlist/')[1]?.split('?')[0];
    }

    async function getPlaylist(url: string) {
        isLoading = true;
        successState = '';
        errorState = '';
        try {
            let id = parseURL(url);
            if (!id) {
                throw new Error("Invalid Link! Please try again.");
            }
            const response = await fetch(`/api/getPlaylist?id=${id}`);
            if (response.ok) {
                const data = await response.json();
                playlistName = data.name;
                playlistImgSrc = data.images[0].url;
            } else {
                throw new Error('Failed to fetch data. Please check link and try again.');
            }
            errorState = "";
            successState = "Success!";
            isVisible = true;
        } catch (e: any) {
            successState = "";
            errorState = e.message;
        } finally {
            isLoading = false;
        }
    }


</script>

<svelte:head>
	<title>Options</title>
	<meta name="description" content="Spotify Multitool Options Page" />
</svelte:head>

<section>
	<h1>
		Enter the link to your Spotify Playlist
	</h1>

    {#if isLoading}
        <div class = "isLoading">
            Loading...
        </div>
    {/if}

    {#if successState}
    <div class = "successState">
        {successState}
    </div>
    {/if}

    {#if errorState}
        <div class = "errorState">
            {errorState}
        </div>
    {/if}

    <form>
        <input
            id="inputbox"
            class="inputbox"
            type="text"
            placeholder="type link here..."
            bind:value={givenLink}
        >
        <input
            id="subButton"
            class="subButton"
            type="submit"
            value="Go"
            on:click={() => (finalLink = givenLink, getPlaylist(finalLink))}
        >
    </form>

    {#if isVisible && !isLoading}
        <div class = "full-container">
            <div class = "playlist-container">
                <div class="playlist-name">
                    {playlistName}
                </div>
                <img class="playlist-cover" alt="playlist cover" src={playlistImgSrc}>
            </div>

            <div class = "songs-container">
                <ol>
                    <li>        
                        <div class="song-number">1</div>
                            <div class="song-info">
                                <!-- Optional song album thumbnail
                                <div class="song-thumbnail">
                                    <img src="album-thumbnail.jpg" alt="">
                                </div>
                                -->
                                <div class="song-details">
                                    <div class="song-title">Song Name</div>
                                    <div class="song-artist">Artist Name</div>
                                </div>
                            </div>
                        <div class="song-duration">3:45</div>
                    </li>
                    <li>        
                        <div class="song-number">2</div>
                            <div class="song-info">
                                <!-- Optional song album thumbnail
                                <div class="song-thumbnail">
                                    <img src="album-thumbnail.jpg" alt="">
                                </div>
                                -->
                                <div class="song-details">
                                    <div class="song-title">Song Name</div>
                                    <div class="song-artist">Artist Name</div>
                                </div>
                            </div>
                        <div class="song-duration">3:45</div>
                    </li>                  
                </ol>
            </div>
        </div>
    {/if}

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
        margin-top: 100px;
        margin-bottom: 10px;
		width: 100%;
	}

    form {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
    }

    input.inputbox {
        margin-bottom: 5px;
        padding: 2px;
        padding-left: 5px;
        background-color: white;
        border: 2px solid black;
        border-radius: 4px;
        width: 100%;
        height: 40px;
    }

    .full-container {
        background-color: rgb(15, 15, 15);
        background-color: black;
        border-radius: 6px;
        margin-top: 20px;
        width: 80%;
        display: flex;
    }

    .full-container:hover {
        transition: ease, 0.3s;
    }

    .songs-container {
        flex: 1;
        padding: 60px 20px 50px 20px;
        color: white;
    }

    .songs-container ol {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .songs-container li {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        margin-bottom: 4px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }

    .songs-container li:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .song-number {
        color: #b3b3b3;
        font-size: 16px;
        min-width: 30px;
        text-align: right;
        margin-right: 16px;
    }

    .song-info {
        display: flex;
        flex: 1;
        align-items: center;
    }

    .song-thumbnail {
        width: 40px;
        height: 40px;
        margin-right: 16px;
        background-color: #333;
        border-radius: 2px;
    }

    .song-details {
        flex: 1;
    }

    .song-title {
        color: #fff;
        font-size: 16px;
        margin-bottom: 4px;
    }

    .song-artist {
        color: #b3b3b3;
        font-size: 14px;
    }

    .song-duration {
        color: #b3b3b3;
        font-size: 14px;
        margin-left: 10px;
    }

    /* Center the heading properly */
    .playlist-name {
        font-size: 36px;
        font-weight: 900;
        color: #fff;
        margin-bottom: 12px;
        line-height: 1.2;
        letter-spacing: -0.5px;
        text-align: center;
        width: 100%;
    }

    /* Ensure the container is properly structured */
    .playlist-container {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* Add this to center vertically too */
        margin-bottom: 24px;
        padding: 16px;
        padding-bottom: 50px;
    }

    /* Fix the cover image alignment */
    .playlist-cover {
        width: auto;
        height: auto;
        border-radius: 10px;
        border: 2px solid white;
        margin-right: 0; /* Remove this right margin which can affect centering */
        margin: 0 auto 20px auto; /* Center with auto margins */
        background-color: #282828;
        display: block; /* Ensures proper block-level display */
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

</style>
