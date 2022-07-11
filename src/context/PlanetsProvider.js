import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarwarsContext';
import fetchAPI from '../hooks/fetchAPI';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
    column: '',
    comparison: '',
    value: 0,
  }); // formato exigido pelo requisito.

  const setStateAPI = async () => {
    const infoAPI = await fetchAPI();
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
        setPlanets(comparisonFilter);
      }

      if (comparison === 'menor que') {
        const comparisonFilter = planets.filter((planet) => (
          Number(planet[column]) < Number(value)));
        setPlanets(comparisonFilter);
      }

      if (comparison === 'igual a') {
        const comparisonFilter = planets.filter((planet) => (
          Number(planet[column]) === Number(value)));
        setPlanets(comparisonFilter);
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

  const verifyNameFilter = (namePlanet) => {
    if (namePlanet.length > 0) {
      const filterNamePlanet = planets.filter((planet) => planet.name
        .toLowerCase().includes(namePlanet));
      setPlanets(filterNamePlanet);
    } else {
      setPlanets(infoAPI);
    }
  };

  const handleChangeName = ({ target: { value } }) => {
    setFilter({
      filterByName: { name: value },
    }); // coloca no objeto do name o valor digitado no input.
    verifyNameFilter(value); // chama a função que verifica as condições do filtro, com o mesmo valor digitado no input.
  };

  const context = {
    planets,
    handleChangeName,
    handleNumericClick,
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
