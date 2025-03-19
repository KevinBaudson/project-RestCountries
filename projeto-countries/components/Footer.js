class Footer extends HTMLElement {
  connectedCallback() {
    const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

    this.innerHTML = `
    <footer class="footer text-white py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <h5 class="text-white">About Us</h5>
            <p class="text-white">Discover curiosities and information about countries around the world.</p>
          </div>

          <div class="col-md-4">
            <h5 class="text-white">Useful Links</h5>
            <ul class="list-unstyled">
              <li><a href="${pathPrefix}index.html" class="text-white">Home</a></li>
              <li><a href="${pathPrefix}pages/list.html" class="text-white">Country List</a></li>
              <li><a href="${pathPrefix}pages/contact.html" class="text-white">Contact</a></li>
              <li><a href="#" class="text-white">Privacy Policy</a></li>
            </ul>
          </div>

          <div class="col-md-4">
            <h5 class="text-white">Get News</h5>
            <form>
              <div class="mb-2">
                <input type="email" class="form-control" placeholder="Your email">
              </div>
              <button type="submit" class="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div class="text-center mt-3">
          <p class="text-white">&copy; 2025 Search Countries. All rights reserved.</p>
        </div>
      </div>
    </footer>`;
  }
}

customElements.define("footer-component", Footer);
