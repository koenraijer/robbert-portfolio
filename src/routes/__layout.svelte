<script context="module">
	export const load = ({ url }) => {
	  const currentRoute = url.pathname
  
	  return {
		props: {
		  currentRoute
		}
	  }
	}

</script>

<script>
	import '../app.css';
	import Navbar from '@components/Navigation/Navbar.svelte'
	import Footer from '@components/Navigation/Footer.svelte'
	import {seo} from '@lib/stores'
	import {fade} from 'svelte/transition'

	export let currentRoute;
</script>

<svelte:head>
	<title>{$seo.title}</title>
	<meta name="description" content="{$seo.description}">

	<!--Facebook-->
	<meta property="og:image" content="{$seo.openGraphURL}">
	<meta property="og:description" content="{$seo.description}">
	<meta property="og:title" content="{$seo.title}">
	
	<!--Twitter-->
	<meta name="twitter:title" content="{$seo.title}">

	<!--Favicons
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
	<link rel="manifest" href="/favicon/site.webmanifest">
	-->

	<!--Preloading-->
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Navbar/>

		{#key currentRoute}
			<main class="flex-grow" in:fade="{{duration: 150 }}" out:fade="{{duration: 150}}">
				<slot />
			</main>
		{/key}

	<Footer />
</div>


