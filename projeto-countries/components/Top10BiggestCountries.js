export class Top10BiggestCountries {
  constructor(containerId) {
    this.container = document.querySelector(containerId);
  }

  render(countries) {
    if (!this.container) return;

    const sortedByArea = countries
      .filter((country) => country.area)
      .sort((a, b) => b.area - a.area)
      .slice(0, 10);

    this.container.innerHTML = "";
    
    sortedByArea.forEach((country, index) => {
      const formattedLanguages = typeof country.languages === "object"
      ? Object.values(country.languages).join(", ") 
      : country.languages || "N/A";
    
    const formattedCurrencies = typeof country.currencies === "object"
      ? Object.values(country.currencies).map(c => c.name).join(", ") 
      : country.currencies || "N/A";

      const listItem = document.createElement("li");
      listItem.className = "list-group-item d-flex align-items-center";

      const flagImg = document.createElement("img");
      flagImg.src = country.flag
      flagImg.alt = `Flag of ${country.name.common}`;
      flagImg.style.width = "40px";
      flagImg.style.height = "40px";
      flagImg.style.marginRight = "10px";
      flagImg.style.objectFit = "cover";
      flagImg.style.boxShadow = "2px 2px 2px";

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

      const areaSpan = document.createElement("span");
      areaSpan.textContent = ` - Area: ${country.area.toLocaleString()} km²`;

      listItem.appendChild(document.createTextNode(`${index + 1 < 10 ? '0' : ''}${index + 1}. `));
      listItem.appendChild(flagImg);
      listItem.appendChild(countryLink);
      listItem.appendChild(areaSpan);

      this.container.appendChild(listItem);
    });
  }
}
