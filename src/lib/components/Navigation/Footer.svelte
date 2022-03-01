<script>
  import Menu from '@components/Navigation/Menu.svelte'
  let bg = "bg-base-200";
</script>
<footer class="px-4 md:px-8 mt-8 py-8 footer bg-base-200">
    <div>
      <span class="footer-title font-semibold text-sm capitalize">Robet Lalisang Photography</span> 
      <ul class="menu bg-base-200">
        <Menu {bg}/>
      </ul>
    </div> 
    <div>
      <span class="footer-title font-semibold text-sm capitalize">Newsletter</span> 
      <div class="form-control w-80">
        <label for="email" class="label">
          <span class="label-text">Enter your email address</span>
        </label> 
        <div class="relative">
          <input type="text" id="email" name="email" placeholder="username@site.com" class="w-full pr-16 input input-bordered"> 
          <button class="absolute top-0 right-0 rounded-l-none btn btn-primary">Subscribe</button>
        </div>
      </div>
    </div>
  </footer>