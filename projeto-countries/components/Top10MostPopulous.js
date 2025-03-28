export class Top10MostPopulous{
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  render(countries) {
    if (!this.container) return;

    const sortedByPopulation = countries
      .filter((country) => country.population)
      .sort((a, b) => b.population - a.population)
      .slice(0, 10);

    this.container.innerHTML = "";

    sortedByPopulation.forEach((country, index) => {

      const formattedLanguages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
      const formattedCurrencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A";

      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex align-items-center";

      const flagImg = document.createElement("img");
      flagImg.src = country.flags?.svg || "";
      flagImg.alt = `Flag of ${country.name.common}`;
      flagImg.style.width = "40px";
      flagImg.style.height = "40px";
      flagImg.style.marginRight = "10px";
      flagImg.style.objectFit = "cover";
      flagImg.style.boxShadow = "2px 2px 2px ";

      const countryLink = document.createElement("a");
      countryLink.href = "#";
      countryLink.textContent = country.name.common;
      countryLink.classList.add("text-decoration-none", "text-dark");
      countryLink.addEventListener("click", (event) => {
        event.preventDefault();
        sessionStorage.setItem("countryData", JSON.stringify({
          ...country,
          languages: formattedLanguages,
          currencies: formattedCurrencies
        }));
        window.location.href = "./pages/details.html";
      });

      const populationSpan = document.createElement("span");
      populationSpan.textContent = ` - Population: ${country.population.toLocaleString()}`;
      
      listItem.appendChild(document.createTextNode(`${index + 1 < 10 ? '0' : ''}${index + 1}. `));
      listItem.appendChild(flagImg);
      listItem.appendChild(countryLink);
      listItem.appendChild(populationSpan);

      this.container.appendChild(listItem);
    });
  }
}
