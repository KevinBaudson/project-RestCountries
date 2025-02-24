export class Table {
  constructor(countries) {
    this.countries = countries;
  }

  createTable() {
    const tableContainer = document.createElement("div");
    tableContainer.className = "table-responsive";

    const table = document.createElement("table");
    table.className = "table table-striped";

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
        ${this.countries.map(country => `
          <tr>
            <td>${country.name.common}</td>
            <td>${country.population.toLocaleString()}</td>
            <td>${country.region}</td>
            <td><img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" style="width: 40px; height: 40px; object-fit: cover;"></td>
          </tr>
        `).join("")}
      </tbody>`;

    tableContainer.appendChild(table); 
    return tableContainer; 
  }

  render(container) {
    container.innerHTML = ""; 
    container.appendChild(this.createTable());
  }
}
