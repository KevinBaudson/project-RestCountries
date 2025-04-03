export class Details {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  async render() {
    let countryData = sessionStorage.getItem("countryData");

    if (!countryData) {
      const urlParams = new URLSearchParams(window.location.search);
      const countryName = urlParams.get("country");

      if (countryName) {
        const allCountries = await fetchCountriesAll();
        countryData = allCountries.find((c) => c.name.common === countryName);
      }
    } else {
      countryData = JSON.parse(countryData);
    }

    if (!countryData) {
      this.container.innerHTML = "<p>Error: No country data found.</p>";
      return;
    }

    const name = countryData.name?.common || countryData.name || "N/A";
    const flag =
      countryData.flag || countryData.flags?.svg || "placeholder.png";
    const region = countryData.region || "N/A";
    const population = countryData.population
      ? parseInt(countryData.population).toLocaleString()
      : "N/A";
    const borders =
      typeof countryData.borders === "string"
        ? countryData.borders.split(", ").join(", ")
        : Array.isArray(countryData.borders)
        ? countryData.borders.join(", ")
        : "None";

    const capital =
      countryData.capital && typeof countryData.capital === "string"
        ? countryData.capital
        : Array.isArray(countryData.capital)
        ? countryData.capital.join(", ")
        : "N/A";

    const languages =
      countryData.languages && typeof countryData.languages === "string"
        ? countryData.languages
        : countryData.languages
        ? Object.values(countryData.languages).join(", ")
        : "N/A";

    const currencies =
      countryData.currencies && typeof countryData.currencies === "string"
        ? countryData.currencies
        : countryData.currencies
        ? Object.values(countryData.currencies)
            .map((c) => c.name)
            .join(", ")
        : "N/A";

    const maps =
      typeof countryData.maps === "string"
        ? countryData.maps
        : countryData.maps?.googleMaps || "#";

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
                <td>${region}</td>
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
                <td>${currencies}</td>
                <td><a href="${maps}" target="_blank">View on Maps</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
