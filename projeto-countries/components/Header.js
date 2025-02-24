class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
   <header class="header text-white">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <h1 class="text-light">Search Countries</h1>
        </a>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

 
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active text-light" href="index.html">Home</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link text-light" href="list.html">Countries</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="contact.html">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>`;
  }
}
customElements.define("header-component", Header);
