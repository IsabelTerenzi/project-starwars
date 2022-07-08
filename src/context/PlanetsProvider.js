import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarwarsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanetsInfo] = useState([]);

  useEffect(() => {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const fetchPlanets = async () => {
      const response = await fetch(URL);
      const { results } = await response.json();
      setPlanetsInfo(results);
    };
    fetchPlanets();
  }, []);

  const context = {
    planets,
  };

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
