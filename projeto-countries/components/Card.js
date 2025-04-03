export class Card {
  constructor(country) {
    this.country = country;
    this.flag = country.flags?.png || country.flag;
    this.name = country.name?.common || country.name;
    this.languages = country.languages
    this.currencies = country.currencies
    this.borders = country.borders ? country.borders : []; 
    this.capital = (country.capital && typeof country.capital === 'string') 
  ? country.capital 
  : (Array.isArray(country.capital) && country.capital.length > 0) 
    ? country.capital[0] 
    : "No capital";
    this.maps = country.maps.googleMaps

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
      sessionStorage.setItem(
        "countryData",
        JSON.stringify({
          name: this.name,
          flag: this.flag,
          languages: this.languages,
          currencies: this.currencies,
          borders: this.borders.length > 0 ? this.borders.join(", ") : "None",
          capital: Array.isArray(this.capital) ? this.capital.join(", ") : this.capital,
          maps: this.maps,
          region: this.country.region || "Unknown",
          population: this.country.population || 0
        })
      );
      window.location.href = "pages/details.html";
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
