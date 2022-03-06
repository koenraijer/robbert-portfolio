<script>
  import Menu from '@components/Navigation/Menu.svelte'
  let y;
  let outerHeight;
  let scrolled = false;
  $: if (y > outerHeight) {
    scrolled = true;
  } else {
    scrolled = false;
  }
</script>
<svelte:window bind:scrollY={y} bind:outerHeight={outerHeight}/>

<nav class="navbar ease-in-out transition duration-300 {scrolled ? "bg-base-100 sticky top-0 h-16" : "bg-transparent h-20"} z-10 px-4 md:px-8">
    <div class="navbar-start w-full">
      <!--Hamburger menu-->
      <div class="dropdown dropdown-start md:hidden" tabindex="0">
        <div tabindex="0" class="pr-4 py-4 hover:cursor-pointer">
          <svg alt="menu icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>

        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
          <Menu/>
        </ul>
      </div>
      
      <h1><a href="/" sveltekit:prefetch class="w-full text-lg">Robbert Lalisang</a></h1>
      
    </div>
    <div class="navbar-end">
      <!--Regular menu-->
      <div class="hidden md:flex">
        <ul class="menu menu-horizontal p-2 z-10">
          <Menu/>
        </ul>
      </div>
    </div>
  </nav>
