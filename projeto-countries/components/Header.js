class Header extends HTMLElement {
  connectedCallback() {
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    this.innerHTML = `
    <header class="header text-white">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
          <a class="navbar-brand" href="${pathPrefix}index.html">
            <h1 class="text-light">Search Countries</h1>
          </a>
        
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
    
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link active text-light" href="${pathPrefix}index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light" href="${pathPrefix}pages/list.html">Countries</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light" href="${pathPrefix}pages/contact.html">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>`;
  }
}

customElements.define("header-component", Header);
