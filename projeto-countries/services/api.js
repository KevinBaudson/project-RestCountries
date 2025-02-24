export async function fetchCountriesAll() {
  const url = "https://restcountries.com/v3.1/all";

  try {
    const response = await fetch(url);
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCountriesByRegion(region) {
  const url = `https://restcountries.com/v3.1/region/${region}`;

  try {
    const response = await fetch(url);
    const countries = await response.json();

    return countries;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCountryByName(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar o país");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function getLanguagesAndCurrencies(countries) {
  const resultCountries = await fetchCountriesByRegion(countries);
  let counterLanguage = {};
  let counterCurrency = {};

  resultCountries.forEach((country) => {
    // Coletando idiomas
    if (country.languages) {
      Object.values(country.languages).forEach((language) => {
        counterLanguage[language] = (counterLanguage[language] || 0) + 1;
      });
    }

    if (country.currencies) {
      Object.values(country.currencies).forEach((currency) => {
        if (currency && currency.name) {
          // Garante que a moeda tem um nome válido
          counterCurrency[currency.name] =
            (counterCurrency[currency.name] || 0) + 1;
        }
      });
    }
  });

  const commonLanguages = Object.entries(counterLanguage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((item) => item[0]);

  const commonCurrencies = Object.entries(counterCurrency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((item) => item[0]);

  return {
    languages:
      commonLanguages.length > 0 ? commonLanguages.join(", ") : "Not Found",
    currencies:
      commonCurrencies.length > 0 ? commonCurrencies.join(", ") : "Not Found",
  };
}

export async function showDetailsByContinent(region) {
  try {
    const countriesOfContinent = await fetchCountriesByRegion(region);
    const showName = document.querySelector(".div-details-region");

    const { languages, currencies } = await getLanguagesAndCurrencies(region);

    const maiorPais = countriesOfContinent.reduce(
      (maior, pais) => (pais.area > maior.area ? pais : maior),
      { area: 0 }
    );
    showName.innerHTML = `    
    <h2>Curiosities about ${region}</h2>
    <ul>
        <li>🌎<strong>Number of countries:</strong> <span id="total-paises"> ${
          countriesOfContinent.length
        }</span></li>
        <li>🗣  <strong>Most common languages:</strong> ${languages}
        </li>
        <li>💰<strong>Most common currencies:</strong> <span id="moedas">
        ${currencies}</span></li>
        <li>👥<strong>Total population:</strong> <span id="populacao">${countriesOfContinent
          .reduce((total, country) => total + (country.population || 0), 0)
          .toLocaleString()}</span></li>
        <li>📏<strong>Largest country by area:</strong> <span id="maior-pais"> ${
          maiorPais.name.common
        } - ${maiorPais.area.toLocaleString()} km²</span></li>
    </ul>`;
  } catch (error) {}
}
