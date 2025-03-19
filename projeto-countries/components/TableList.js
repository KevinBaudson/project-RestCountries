export class Table {
  constructor(countries) {
    this.countries = countries;
    console.log(countries);
  }

  createTable() {
    const tableContainer = document.createElement("div");
    tableContainer.className = "table-responsive";

    const table = document.createElement("table");
    table.className = "table table-striped table-hover";

    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Population</th>
          <th>Continent</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        ${this.countries
          .map(
            (country) => `
          <tr class="clickable-row" data-country-name="${
            country.name.common
          }" data-country-id="${country.cca3}" data-country-pop="${
              country.population
            }" data-country-region="${country.region}" data-country-flag="${
              country.flags.svg
            }" data-country-capital="${
              country.capital ? country.capital[0] : "N/A"
            }" data-country-languages="${
              country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"
            }" data-country-currencies="${
              country.currencies
                ? Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ")
                : "N/A"
            }" data-country-borders="${
              country.borders ? country.borders.join(", ") : "None"
            }" data-country-maps="${
              country.maps ? country.maps.googleMaps : "#"
            }">
            <td>${country.name.common}</td>
            <td>${country.population.toLocaleString()}</td>
            <td>${country.region}</td>
            <td>
              <img src="${country.flags.svg}" alt="Flag of ${
              country.name.common
            }" class="img-fluid" style="width: 40px; height: 40px; object-fit: cover;">
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>`;

    tableContainer.appendChild(table);

    // Adicionando cursor-pointer e comportamento de clique nas linhas
    table.querySelectorAll(".clickable-row").forEach((row) => {
      row.classList.add("cursor-pointer"); 

      row.addEventListener("click", (e) => {
        const countryName = e.currentTarget.getAttribute("data-country-name");
        const countryId = e.currentTarget.getAttribute("data-country-id");
        const countryPop = e.currentTarget.getAttribute("data-country-pop");
        const countryRegion = e.currentTarget.getAttribute(
          "data-country-region"
        );
        const countryFlag = e.currentTarget.getAttribute("data-country-flag");
        const countryCapital = e.currentTarget.getAttribute(
          "data-country-capital"
        );
        const countryLanguages = e.currentTarget.getAttribute(
          "data-country-languages"
        );
        const countryCurrencies = e.currentTarget.getAttribute(
          "data-country-currencies"
        );
        const countryBorders = e.currentTarget.getAttribute(
          "data-country-borders"
        );
        const countryMaps = e.currentTarget.getAttribute("data-country-maps");

        sessionStorage.setItem(
          "countryData",
          JSON.stringify({
            name: countryName,
            id: countryId,
            population: countryPop,
            region: countryRegion,
            flag: countryFlag,
            capital: countryCapital,
            languages: countryLanguages,
            currencies: countryCurrencies,
            borders: countryBorders,
            maps: countryMaps,
          })
        );

        console.log("Dados armazenados no sessionStorage:", {
          name: countryName,
          id: countryId,
          population: countryPop,
          region: countryRegion,
          flag: countryFlag,
          capital: countryCapital,
          languages: countryLanguages,
          currencies: countryCurrencies,
          borders: countryBorders,
          maps: countryMaps,
        });

        window.location.href = "details.html";
      });
    });

    return tableContainer;
  }

  render(container) {
    container.innerHTML = "";
    container.appendChild(this.createTable());
  }
}
