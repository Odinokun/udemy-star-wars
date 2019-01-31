class SwapiService {

  _apiBase = 'https://swapi.co/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    //если ответ сервера не 200, то возвращаем ошибку и ее код
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} , received ${res.status}`)
    }
    // если все ОК, возвращаем JSON
    return await res.json();
  }

  // работаем с людьми
  async getAllPeople() {
    //получим массив объектов людей
    const res = await this.getResource(`/people/`);
    return res.results;
  }
  getPerson(id) {
    return this.getResource(`/people/${id}/`);
  }

  // работаем с планетами
  async getAllPlanets() {
    //получим массив объектов планет
    const res = await this.getResource(`/planets/`);
    return res.results;
  }
  getPlanet(id) {
    return this.getResource(`/planets/${id}/`);
  }

  // работаем с космическими кораблями
  async getAllStarships() {
    //получим массив объектов космических кораблей
    const res = await this.getResource(`/starships/`);
    return res.results;
  }
  getStarship(id) {
    return this.getResource(`/starships/${id}/`);
  }
}


const swapi = new SwapiService();

swapi.getAllStarships().then((planet) => {
  planet.forEach((p) => {
    console.log(p.name);
  })
});

swapi.getStarship(13).then((p) => {
  console.log(p.name);
});