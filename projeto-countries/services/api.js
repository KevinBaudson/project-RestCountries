class API {
  static async fetchCountriesAll() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) throw new Error("Erro ao buscar os países.");
      return await response.json();
    } catch (error) {
      console.error("Erro na API:", error);
      return []; 
    }
  }
}

export default API;
