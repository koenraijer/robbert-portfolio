<script context="module">
    import {client} from '@lib/api/graphql-client'
    import {projectsQuery} from '@lib/api/graphql-queries'

    export const load = async () => {
        
        let sm = 640;
        let md = 768;
        let lg = 1024;
        let xl = 1280;
        let xxl = 1536;

        const variables = {sm: sm, md: md, lg: lg, xl: xl}

        const {projects} = await client.request(projectsQuery, variables)

        return {
            props: {
                projects,
                sm, md, lg, xl, xxl
            }
        }
    }
</script>
<script>
    // Src: https://github.com/alexstaroselsky/svelte-lazy-image
    export let projects;

    let base64pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEElEQVR42mNkIAAYRxWAAQAG9gAKqv6+AwAAAABJRU5ErkJggg=="

    function useLazyImage(
        node,
        { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.0 } = {},
        ) {
            if (window && 'IntersectionObserver' in window) {
                const observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const image = entry.target;

                                if (image.dataset.src) {
                                    image.src = image.dataset.src;
                                }

                                if (image.dataset.srcset) {
                                    image.srcset = image.dataset.srcset;
                                }

                                observer.unobserve(image);
                            }
                        });
                    },
                    {
                        root,
                        rootMargin,
                        threshold,
                    },
                );
                observer.observe(node);

                return {
                    destroy() {
                        if (observer) {
                            observer.unobserve(node);
                        }
                    },
                };
            }
    }
</script>

<div class="grid grid-cols-1 gap-4 md:gap-8">
    {#each projects as project}
    <div>
        <a sveltekit:prefetch class="group grid place-items-center" href="/{project.slug}">
            <img    
                    class="row-start-1 col-start-1 h-full w-full" 
                    alt="project img" 
                    data-srcset="{project.image[0].sm} 640w, {project.image[0].md} 768w, {project.image[0].lg} 1024w, {project.image[0].xl} 1280w, {project.image[0].xxl} 1536w" 
                    srcset="{base64pixel}"
                    data-src="{project.image[0].xxl}"
                    src="{base64pixel}"
                    use:useLazyImage={{ threshold: 0.5}} 
                    decoding="async" 
                    loading="lazy"
            />
            <h2 class="row-start-1 col-start-1 p-4 text-xl invisible group-hover:visible">{project.name}</h2>
        </a>
    </div>
    {/each}
</div>