export class Card {
  constructor(country) {
    this.country = country;
    this.flag = country.flags?.svg || "placeholder.png";
    this.name = country.name?.common || "Name is not defined";
  }

  render() {
    const card = document.createElement("div");
    card.classList.add("card", "text-bg-dark");

    const imgCard = document.createElement("img");
    imgCard.classList.add("card-img-top", "opacity-75");
    imgCard.src = this.flag;
    imgCard.alt = `Flag of ${this.name}`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-img-overlay");

    const titleCard = document.createElement("p");
    titleCard.classList.add("card-title", "text-white");
    titleCard.innerText = this.name;

    const btnSeeMore = document.createElement("button");
    btnSeeMore.classList.add("btn", "text-light");
    btnSeeMore.innerHTML = "See details...";

    const redirectToDetails = () => {
      sessionStorage.setItem("countryData", JSON.stringify(this.country));
      window.location.href = "details.html";
    };


    card.addEventListener("click", redirectToDetails);

    btnSeeMore.addEventListener("click", (event) => {
      event.stopPropagation();
      redirectToDetails();
    });

    cardBody.appendChild(titleCard);

    card.appendChild(imgCard);
    card.appendChild(cardBody);
    
    card.appendChild(btnSeeMore);

    return card;
  }
}
