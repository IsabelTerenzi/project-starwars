import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarwarsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  }); // formato exigido pelo requisito.
  const [planetsFiltered, setPlanetsFiltered] = useState([]); // foi necessário criar mais um array, para não cair em looping.

  useEffect(() => {
    const fetchAPI = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(URL);
      const { results } = await response.json();
      const filteredResidents = results.filter((result) => result !== 'residents');
      setPlanets(filteredResidents);
      setPlanetsFiltered(filteredResidents);
    };
    fetchAPI();
  }, []);

  const verifyNumericFilters = (arrayFilters) => {
    if (arrayFilters.length > 0) {
      arrayFilters.forEach(({ column, comparison, value }) => {
        const comparisonFilter = planetsFiltered.filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[column]) > Number(value);
          }

          if (comparison === 'menor que') {
            return Number(planet[column]) < Number(value);
          }

          if (comparison === 'igual a') {
            return Number(planet[column]) === Number(value);
          }
          return planetsFiltered;
        });
        setPlanetsFiltered(comparisonFilter);
      });
    }
  };

  const handleChangeName = ({ target: { value } }) => {
    const filterNamePlanet = planets.filter((planet) => planet.name
      .toLowerCase().includes(value));

    setFilter({
      ...filter,
      filterByName: { name: value },
    }); // coloca no objeto do name o valor digitado no input.
    setPlanetsFiltered(filterNamePlanet);
  };

  const handleNumericClick = (filters) => {
    const arrayFilters = [...filter.filterByNumericValues, filters];// cria a constante para acumular vários filtros.
    setFilter({
      ...filter,
      filterByNumericValues: arrayFilters,
    });
    verifyNumericFilters(arrayFilters);
  };

  const context = {
    planets,
    handleChangeName,
    handleNumericClick,
    planetsFiltered,
    filter,
  }; // valores do meu provider, para serem utilizados em todos os componentes criados, com o useContext.

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
