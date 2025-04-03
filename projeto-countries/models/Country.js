class Country {
    constructor(name, region, population, area, flag, borders, capital, languages, currencies, maps) {
      this.name = { common: name };
      this.region = region || "N/A";
      this.population = population || "N/A";
      this.area = area || "N/A";
      this.flag = flag;
      this.borders = borders
      this.capital = Array.isArray(capital)?capital[0]:"No Capital";
      this.languages = languages ? Object.values(languages).join(", ") : "N/A";
      this.currencies = currencies ? Object.values(currencies).map(c => c.name).join(", ") : "N/A";
      this.maps = maps
    }
  }
  
  export default Country;