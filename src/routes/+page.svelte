<script lang="ts">
	import logo from '$lib/images/logo.png';

	import { goto } from '$app/navigation';

	function navigateTo(path: string) {
		goto(path);
	}

	let isLoading = false;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Spotify Multitool Home Page" />
</svelte:head>

<section>
	<span>
		<img class = "logo" alt="logo" src={logo}/>
	</span>
	<h1>
		Welcome to Spotify Multitool
	</h1>
	<h2>
		Click below to get started!
	</h2>

	<button on:click={() => (isLoading = true, navigateTo('/options'))} class="subButton">
		{isLoading ? 'Loading...' : 'Get Started'}
	</button>

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
		width: 100%;
	}

	h2 {
		margin-top: 10px;
	}

	img {
		display: block;
		margin: auto;
		width: 50%;
		border-radius: 50%;
		margin-bottom: 10px;
		
	}

	.logo{
		transition: ease, 0.3s;
	}

	.logo:hover{
		transform: scale(1.05); /* Makes button 5% larger */
		box-shadow: 0 2px 5px rgba(0,0,0,0.2);
	}
</style>
