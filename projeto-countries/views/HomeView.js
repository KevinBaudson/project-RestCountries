import { Card } from "../components/Card.js";

class HomeView {
  static renderCards(countries) {
    const container = document.querySelector("#container-cards");
    container.innerHTML = "";

    countries.forEach((country) => {
      const card = new Card(country);
      container.appendChild(card.render());
    });
  }

  static updatePageControls(currentPage, totalPages) {
    document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("prev-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = currentPage === totalPages;
  }
}

export default HomeView;
