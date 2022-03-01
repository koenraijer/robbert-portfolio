<script>
  export let src
  export let alt
  export let width = 1500;
  export let height = 1500;
</script>

<img {src} {alt} {height} {width} loading="lazy" decoding="async"/>

<style>
  img {
    width: 100%;
    height: auto;
  }
</style>