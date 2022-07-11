const fetchAPI = async () => {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(URL);
  const { results } = await response.json();
  const filteredResidents = results.filter((result) => result !== 'residents');
  return filteredResidents;
};

export default fetchAPI;
