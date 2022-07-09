import { useState, useEffect } from 'react';

const useFetchAPI = () => {
  const [infoAPI, setInfoAPI] = useState([]);
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch(URL);
      const { results } = await response.json();
      const filteredResidents = results.filter((result) => result !== 'residents');
      setInfoAPI(filteredResidents);
    };
    fetchPlanets();
  }, []);

  return [infoAPI];
};

export default useFetchAPI;
