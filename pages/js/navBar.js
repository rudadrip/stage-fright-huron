//puts a functional navbar at the top of every page
class navBar extends HTMLElement {
    constructor () {
        super();
    }
    connectedCallback () {
        this.render();

        const page = this.getAttribute('page');
        if (page == "home") {
            this.querySelector("#home").classList.add("active");
        } else if (page == "merch") {
            this.querySelector("#merch").classList.add("active");
        } else if (page == "td") {
            this.querySelector("#td").classList.add("active");
        } else if (page == "au") {
            this.querySelector("#au").classList.add("active");
        } else if (page == "faq") {
          this.querySelector("#faq").classList.add("active");
        } else if (page == "not-in-navbar") {
          this.querySelector("#not-in-navbar").classList.add("active"); //used for pages that exist but can't be accessed from the navbar
        } 
    }
    render () {
        this.innerHTML=
`
  <style>
  @font-face {
  font-family:"Old London";
  src: url("../../assets/fonts/OldLondon.ttf") format("truetype");
}
  .navbar-brand, .nav-item {  
    font-family: 'Old London', serif; 
  }
  .nav-item {
      transition: transform 0.5s ease
  }
  .nav-item:hover {
      background-color: #041733;
  }
  </style>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container-fluid">
      <a class="navbar-brand" href="/pages/index.html">Stage Fright</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" style="width=0px;">
            <a id="not-in-navbar" class="nav-link" href="contactus.html"> </a>
          </li>
          <li class="nav-item">
            <a id="home" class="nav-link" href="index.html">Home</a>
          </li>
          <li class="nav-item">
            <a id="merch" class="nav-link" href="merch.html">Merch</a>
          </li>
          <li class="nav-item">
            <a id="td" class="nav-link" href="tourdates.html">Tour Dates</a>
          </li>
          <li class="nav-item">
            <a id="faq" class="nav-link" href="faqs.html">FAQs</a>
          </li>
          <li class="nav-item">
            <a id="au" class="nav-link" href="members.html">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Cart</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`
    }
}

customElements.define("nav-bar", navBar );