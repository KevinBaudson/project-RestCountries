document.addEventListener("DOMContentLoaded", () => {
  // pegando os elementos da index
  const containerCards = document.querySelector("#container-cards");
  const mainSearchList = document.querySelector("#main-search-list");
  const countryDetails = document.querySelector("#countryDetails");

  // Variável global para guardar os países
  let countries = [];

  if (containerCards) {
    const showAllCountries = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          fetch("https://restcountries.com/v3.1/region/america"),
          fetch("https://restcountries.com/v3.1/region/europe"),
          fetch("https://restcountries.com/v3.1/region/asia"),
        ]);

        const america = await res1.json();
        const europe = await res2.json();
        const asia = await res3.json();

        const containerCardsAmerica =
          document.querySelector("#container-cards");
        const containerCardsEurope =
          document.querySelector("#container-cards-2");
        const containerCardsAsia = document.querySelector("#container-cards-3");

        // ForEach para continentes limitando a no máximo 15 países
        america.slice(0, 15).forEach((country) => {
          let flag = country.flags.png;
          let name = `${
            country.name.common.length > 15
              ? country.name.common.substring(0, 15) + "..."
              : country.name.common
          }`;
          let card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
          <div className="img-card">
            <img src=${flag} alt = 'flag of ${name}' class="card-img-top" >
          </div>
          <div class="card-body">
            <span class="card-title"><strong>${name}</strong></span>
          </div>
          `;
          card.addEventListener("click", () => {
            redirectToDetailsCountry(country);
          });
          containerCardsAmerica.appendChild(card);
        });

        europe.slice(0, 15).forEach((country) => {
          let flag = country.flags.png;
          let name = `${
            country.name.common.length > 15
              ? country.name.common.substring(0, 15) + "..."
              : country.name.common
          }`;
          let card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
          <div className="img-card">
            <img src=${flag} alt = 'flag of ${name}' class="card-img-top" >
          </div>
          <div class="card-body">
            <span class="card-title"><strong>${name}</strong></span>
          </div>
          `;
          card.addEventListener("click", () => {
            redirectToDetailsCountry(country);
          });
          containerCardsEurope.appendChild(card);
        });
        asia.slice(0, 15).forEach((country) => {
          let flag = country.flags.png;
          let name = `${
            country.name.common.length > 15
              ? country.name.common.substring(0, 15) + "..."
              : country.name.common
          }`;
          let card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
          <div className="img-card">
            <img src=${flag} alt = 'flag of ${name}' class="card-img-top" >
          </div>
          <div class="card-body">
            <span class="card-title"><strong>${name}</strong></span>
          </div>
          `;
          card.addEventListener("click", () => {
            redirectToDetailsCountry(country);
          });
          containerCardsAsia.appendChild(card);
        });


        function redirectToDetailsCountry(country) {
          sessionStorage.setItem("countryData", JSON.stringify(country));
          window.location.href = "details.html";
        }
      } catch (error) {
        console.log(`Erro ao consumir API: ${error}`);
      }
    };

    // Função para pegar detalhes do país e mostrar no details.html

    showAllCountries();
  } else if (mainSearchList) {
    // Buscando o input e a table no html
    const searchInput = document.getElementById("input-search");
    const tableCountries = document.getElementById("table-countries");
  
    const btnContinent = document.querySelectorAll(".continent");

    // Função de filtragem por continente
    btnContinent.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
  
        const valor = e.target.value;
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${valor}`
        );
        const data = await res.json();
        if (res.status == 200) {
          tableCountries.innerHTML = "";
          data.forEach((country) => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${country.name.common}</td>
            <td>${country.capital}<td>
            <td>${country.population}</td>
            <td><img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" width="40"></td>
            `;

            tableCountries.appendChild(row);
          });
        } else {
          const warning = document.querySelector(".warning");
          warning.style.display = "block";
          setTimeout(() => {
            warning.style.display = "none";
          }, 2000);
        }
      });
    });

    function loadingCountries() {
      // outra maneira de fazer uma fetch
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => {
          countries = data; // Armazenando na variável Global

          showCountries(countries);
        })
        .catch((error) => console.error("Erro ao buscar países:", error));
    }

    // Função para exibir os países na tabela
    function showCountries(list) {
      tableCountries.innerHTML = "";
      list.forEach((country) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${country.name.common}</td>
            <td>${country.capital}<td>
            <td>${country.population}</td>
            <td><img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" width="40"></td>
            `;

        tableCountries.appendChild(row);
      });
    }

    // Função para filtrar os países com base no input
    function filterCountries() {
      const word = searchInput.value.toLowerCase();
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(word)
      );
      showCountries(filteredCountries);
    }

    // Evento para capturar a digitação no campo de busca
    searchInput.addEventListener("input", filterCountries);

    // Função iniciada ao carregar a página de lista
    loadingCountries();
  } else if (countryDetails) {
    getCountryDetails();
  }

  function getCountryDetails() {
    const countryData = sessionStorage.getItem("countryData");

    const countryJson = JSON.parse(countryData);
    const name = countryJson.name.common
    const borders = countryJson.borders;
    const flag = countryJson.flags.svg;
    console.log(countryJson)
    const continent = countryJson.continents
    const population = countryJson.population

    countryDetails.innerHTML = `
   
     
        <div class="img-details">
          <img src= ${flag} />
        </div>
        <div>
          <p><strong>Name: </strong>${name}<p/>
          <p><strong>Population: </strong> ${population} </p>
          <p><strong>Continent :</strong> ${continent}</p>
           <p><strong>Borders :</strong> ${borders}</p>
        </div>
      </div>

    
    `;
  }
});
