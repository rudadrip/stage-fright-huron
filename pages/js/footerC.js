//puts the footer on the bottom of every page
class footerC extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback(){
      this.render()
    }
    render(){
      this.innerHTML=`
<div class="container bg-black text-white">
  <footer class="d-flex flex-wrap justify-content-center text-center align-items-center py-3 my-4 border-top">
    <p class="col-md-4 mb-0 text-center">© 2024-2025 Stage Fright
    <a href="tos.html" class="nav-link text-white">Terms of Service</a><a href="privacy.html" class="nav-link text-white">Privacy Policy</a></p>

    <a href="index.html" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <img alt="Stage Fright Logo" class="img-fluid w-50 h-50" src="../assets/logo.jpg"/ >
    </a>

    <ul class="nav col-md-4 justify-content-center text-center">
      <li class="nav-item"><a href="index.html" class="nav-link px-2 text-white">Home</a></li>
      <li class="nav-item"><a href="merch.html" class="nav-link px-2 text-white">Merch</a></li>
      <li class="nav-item"><a href="tourdates.html" class="nav-link px-2 text-white">Tour Dates</a></li>
      <li class="nav-item"><a href="faqs.html" class="nav-link px-2 text-white">FAQs</a></li>
      <li class="nav-item"><a href="members.html" class="nav-link px-2 text-white">About Us</a></li>
      <li class="nav-item"><a href="contactus.html" class="nav-link px-2 text-white">Contact Us</a></li>
    </ul>
  </footer>
</div>
      `
    }
  }
  
  customElements.define("footer-c",footerC)