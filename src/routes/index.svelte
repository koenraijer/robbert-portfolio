<script context="module">
    // Vanilla lazy loading: https://dev.to/ekafyi/lazy-loading-images-with-vanilla-javascript-2fbj 
    // Svelte lazy loading: https://css-tricks.com/lazy-loading-images-in-svelte/ 
    // MDN responsive images: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
    // Sharp documentation: https://sharp.pixelplumbing.com 
    import {client} from '@lib/api/graphql-client'
    import {projectsQuery} from '@lib/api/graphql-queries'

    export const load = async () => {
        
        let width = 1500;
        let height = 1200;
        const variables = {width: width, height: height}

        const {projects} = await client.request(projectsQuery, variables)

        return {
            props: {
                projects,
            }
        }
    }
</script>
<script>
    import Image from '@components/Image/Image.svelte'
    import {inview} from 'svelte-inview'
    import {fade} from 'svelte/transition'
    
    export let projects;
    let height;
    let width;

    let base64pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEklEQVR42mNMkmTACxhHFYABAMtfBF25QVgfAAAAAElFTkSuQmCC"

    let isInView;
    const options = {
        rootMargin: '-20%',
        threshold: '0.05',
        unobserveOnEnter: true,
    };

    const handleChange = ({ detail }) => (isInView = detail.inView);
</script>




<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-4">
    {#each projects.slice(0, 2) as project}
        <a class="group grid place-items-center" in:fade="{{duration: 300 }}" href="/{project.slug}">
            <img class="row-start-1 col-start-1" {height} {width} alt="project img" src="{project.image[0].url}"/>
            <h2 class="row-start-1 col-start-1 p-4 text-xl invisible group-hover:visible">{project.name}</h2>
        </a>
    {/each}
</div>
<div class="grid grid-cols-1 gap-4 md:gap-8">
    {#each projects.slice(2, projects.length) as project}
        <div use:inview="{options}" on:change="{handleChange}">
            {#if isInView}
                <a sveltekit:prefetch class="group grid place-items-center" in:fade="{{duration: 300 }}" href="/{project.slug}">
                    <img class="row-start-1 col-start-1" alt="project img" src="{project.image[0].url}"/>
                    <h2 class="row-start-1 col-start-1 p-4 text-xl invisible group-hover:visible">{project.name}</h2>
                </a>
            {:else}
                <img class="h-full w-full" alt="project img" src="{base64pixel}"/>
            {/if}
        </div>
    {/each}
</div>