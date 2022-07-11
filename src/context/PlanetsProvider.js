import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarwarsContext';
import fetchAPI from '../fetch/fetchAPI';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
    column: '',
    comparison: '',
    value: 0,
  }); // formato exigido pelo requisito.
  const [planetsFiltered, setPlanetsFiltered] = useState([]); // foi necessário criar mais um array, para não cair em looping.

  const setStateAPI = async () => {
    const infoAPI = await fetchAPI();
    setPlanetsFiltered(infoAPI);
    setPlanets(infoAPI);
  };

  useEffect(() => {
    setStateAPI();
  }, []);

  useEffect(() => {
    const verifyNumericFilters = () => {
      const { column, comparison, value } = filter;

      if (comparison === 'maior que') {
        const comparisonFilter = planets.filter((planet) => (
          Number(planet[column]) > Number(value)));
        setPlanetsFiltered(comparisonFilter);
      }

      if (comparison === 'menor que') {
        const comparisonFilter = planets.filter((planet) => (
          Number(planet[column]) < Number(value)));
        setPlanetsFiltered(comparisonFilter);
      }

      if (comparison === 'igual a') {
        const comparisonFilter = planets.filter((planet) => (
          Number(planet[column]) === Number(value)));
        setPlanetsFiltered(comparisonFilter);
      }
    };
    verifyNumericFilters();
  }, [planets, filter]);

  const handleNumericClick = (coluna, comparativo, valor) => {
    setFilter({
      ...filter,
      column: coluna,
      comparison: comparativo,
      value: valor,
    });
  };

  const handleChangeName = ({ target: { value } }) => {
    setFilter({
      ...filter,
      filterByName: { name: value },
    }); // coloca no objeto do name o valor digitado no input.

    const filterNamePlanet = planets.filter((planet) => planet.name
      .toLowerCase().includes(value));
    setPlanetsFiltered(filterNamePlanet);
  }; // verifica as condições de existência do nome do planeta com o retorno da API.

  const context = {
    planets,
    handleChangeName,
    handleNumericClick,
    planetsFiltered,
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
