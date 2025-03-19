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
        countryData = allCountries.find(c => c.name.common === countryName);
      }
    } else {
      countryData = JSON.parse(countryData);
      console.log(countryData);
      console.log(countryData.flag);
    }

    if (!countryData) {
      this.container.innerHTML = "<p>Error: No country data found.</p>";
      return;
    }

    const { name, flags, region, population, borders, languages, currencies, capital, maps } = countryData;
    const flag = countryData.flag;
    this.container.innerHTML = `
      <h2 class="fw-bold">${name.common || name}</h2>
      <div class="content-details d-flex flex-column flex-md-row gap-3">
        <div class="img-details">
          <img src="${flags?.svg || flag}" alt="Flag of ${name.common}" class="img-fluid shadow-lg rounded">
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
                <td>${region || "N/A"}</td>
                <td>${parseInt(population).toLocaleString() || "N/A"}</td>
                <td>${borders || "None"}</td>
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
                <td>${capital || "N/A"}</td>
                <td>${languages || "N/A"}</td>
                <td>${currencies || "N/A"}</td>
                <td><a href="${maps || "#"}" target="_blank">View on Maps</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
