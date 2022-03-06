<script context="module">
    import {client} from '@lib/api/graphql-client'
    import {projectQuery} from '@lib/api/graphql-queries'
    export const load = async ({ params }) => {
        const {slug} = params

        let sm = 640;
        let md = 768;
        let lg = 1024;
        let xl = 1280;
        let xxl = 1536;

        const variables = {sm, md, lg, xl, slug}

        const {project} = await client.request(projectQuery, variables)

        return {
            props: {
                project, sm, md, lg, xl, xxl
            }
        }
    }
</script>

<script>
    export let project, sm, md, lg, xl, xxl;

    import {marked} from 'marked';
    import {useLazyImage} from '@lib/functions'
    let base64pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAQAAACRI2S5AAAAEElEQVR42mNkIAAYRxWAAQAG9gAKqv6+AwAAAABJRU5ErkJggg=="

</script>


<svelte:head>
<title>{project.name}</title>
</svelte:head>

<div class="px-4 md:px-8">
  {#each project.image as image}
  <div class="h-auto mb-5">
    <img    
      class="row-start-1 col-start-1 h-full w-full" 
      alt="{project.name}" 
      data-srcset="{image.sm} {sm + "w"}, {image.md} {md + "w"}, {image.lg} {lg + "w"}, {image.xl} {xl + "w"}, {image.xxl} {xxl + "w"}" 
      srcset="{base64pixel}"
      data-src="{image.xxl}"
      src="{base64pixel}"
      use:useLazyImage={{ threshold: 0.5}} 
      decoding="async" 
      loading="lazy"
    />
  </div>
  {/each}
  
  <h1 class="text-4xl font-semibold">{project.name}</h1>
  
  <div class="mb-5 flex justify-between">
  <div>
    {#if project.tags}
      {#each project.tags as tag}
        <span
          class="badge badge-primary mr-2"
          >{tag}</span
        >
      {/each}
    {/if}
  </div>
  </div>
  
  <div
  class="mb-5 prose flex prose-a:text-primary hover:prose-a:text-primary-focus"
  >
  <a class="mr-5" href={project.demo}>Demo</a>
  <a href={project.sourceCode}>Source Code</a>
  </div>
  
  <article class="prose prose-lg">
  {@html marked(project.description)}
  </article>
</div>
