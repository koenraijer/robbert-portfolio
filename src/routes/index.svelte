<script context="module">
    import {client} from '@lib/api/graphql-client'
    import {projectsQuery} from '@lib/api/graphql-queries'

    export const load = async () => {
        
        let sm = 640;
        let md = 768;
        let lg = 1024;
        let xl = 1280;
        let xxl = 1536;

        const variables = {sm, md, lg, xl}

        const {projects} = await client.request(projectsQuery, variables)

        return {
            props: {
                projects, sm, md, lg, xl, xxl
            }
        }
    }
</script>
<script>
    export let projects, sm, md, lg, xl, xxl;
    import {useLazyImage} from '@lib/functions'
    import { Parallax, ParallaxLayer } from 'svelte-parallax';
    import {seo} from '@lib/stores'
    let base64pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEElEQVR42mNkIAAYRxWAAQAG9gAKqv6+AwAAAABJRU5ErkJggg=="

</script>

<svelte:head>
	<title>{$seo.title}</title>
	<meta name="description" content="{$seo.description}">
    <link rel="preload" as="image" href="{projects[0].image[0].xxl}" imagesrcset="{projects[0].image[0].sm} {sm + "w"}, {projects[0].image[0].md} {md + "w"}, {projects[0].image[0].lg} {lg + "w"}, {projects[0].image[0].xl} {xl + "w"}, {projects[0].image[0].xxl} {xxl + "w"}" imagesizes="85vw">
</svelte:head>

<div class="-mt-20 pb-8 h-full w-full">
    <Parallax config={{ stiffness: 1, damping: 1 }} 
    threshold={{ top: 0, bottom: 0 }} 
    sections={1}>
        <ParallaxLayer offset={0} span={1} rate={-0.5}>
            <div class="w-full h-full">
                <img    
                    class="w-full h-full object-cover" 
                    alt="{projects[0].name}" 
                    srcset="{projects[0].image[0].sm} {sm + "w"}, {projects[0].image[0].md} {md + "w"}, {projects[0].image[0].lg} {lg + "w"}, {projects[0].image[0].xl} {xl + "w"}, {projects[0].image[0].xxl} {xxl + "w"}" 
                    sizes="85vw"
                    src="{projects[0].image[0].xxl}"
                    use:useLazyImage={{ threshold: 0}} 
                />
            </div>
        </ParallaxLayer>    
    </Parallax>
</div>

<div class="px-4 md:px-8">
    <div class="w-full my-8 text-2xl">
        <p class=""><b>About Robbert</b>. Saepe voluptas laudantium dolores. Lorem officiis. Animi obcaecati, esandae labore asperiorestur quibusdam? Dolor non veniam eaque neque laborum fugit, aliquid earum laboriosam dolores. <a class="link" href="/about">More >></a></p>
        <h1 class="text-4xl mt-12 font-semibold">Selected work</h1>
    </div>
    <div class="grid md:grid-cols-2 gap-4 md:gap-8 mb-8">
        {#each projects.slice(1, projects.length) as project}
        <div class="overflow-hidden h-full w-full">
            <Parallax config={{ stiffness: 1, damping: 1 }} 
            threshold={{ top: -5, bottom: 0 }} 
            sections={0.5}>
                <ParallaxLayer offset={0} span={1} rate={-0.05}>
                    <a sveltekit:prefetch class="group grid place-items-center" href="/{project.slug}">
                        <img    
                                class="row-start-1 col-start-1 h-[125%] w-[125%] transition-opacity group-hover:opacity-20" 
                                alt="{project.name}" 
                                data-srcset="{project.image[0].sm} {sm + "w"}, {project.image[0].md} {md + "w"}, {project.image[0].lg} {lg + "w"}, {project.image[0].xl} {xl + "w"}, {project.image[0].xxl} {xxl + "w"}" 
                                sizes="85vw"
                                srcset="{base64pixel}"
                                data-src="{project.image[0].xxl}"
                                src="{base64pixel}"
                                use:useLazyImage={{ threshold: 0}} 
                                decoding="async" 
                                loading="lazy"
                        />
                        <h2 class="row-start-1 col-start-1 p-4 text-xl invisible group-hover:visible">{project.name}</h2>
                    </a>
                </ParallaxLayer>    
            </Parallax>
        </div>

        {/each}
    </div>    
</div>
