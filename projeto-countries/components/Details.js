export class Details {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    const countryData = sessionStorage.getItem("countryData");

   
    const countryJson = JSON.parse(countryData);
    

    const name = countryJson.name.common;
    const flag = countryJson.flags.svg;
    const continent = countryJson.continents?.join(", ") || "N/A";
    const population = countryJson.population.toLocaleString("pt-BR");
    const borders = countryJson.borders?.join(", ") || "None";

    const languages = countryJson.languages ? Object.values(countryJson.languages).join(", ") : "N/A";
    const currencyKey = countryJson.currencies ? Object.keys(countryJson.currencies)[0] : null;
    const currency = currencyKey ? `${countryJson.currencies[currencyKey].name} (${countryJson.currencies[currencyKey].symbol})` : "N/A";

    const capital = countryJson.capital ? countryJson.capital[0] : "N/A";
    const googleMaps = countryJson.maps?.googleMaps || "#";


    this.container.innerHTML = `
      <h2 class="fw-bold">${name}</h2>
      <div class="content-details d-flex flex-column flex-md-row gap-3">
        <div class="img-details">
          <img src="${flag}" alt="Flag of ${name}" class="img-fluid shadow-lg rounded">
        </div>
        <div class="table-details">
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th>Continent</th>
                <th>Population</th>
                <th>Borders</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${continent}</td>
                <td>${population}</td>
                <td>${borders}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-bordered mt-3">
            <thead class="table-dark">
              <tr>
                <th>Capital</th>
                <th>Languages</th>
                <th>Currency</th>
                <th>Google Maps</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${capital}</td>
                <td>${languages}</td>
                <td>${currency}</td>
                <td><a href="${googleMaps}" target="_blank">View on Maps</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
