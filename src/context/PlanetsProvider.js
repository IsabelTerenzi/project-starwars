import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarwarsContext';
import useFetchAPI from '../hooks/useFetchAPI';

function PlanetsProvider({ children }) {
  const [infoAPI] = useFetchAPI(); // chama o estado criado no hook personalizado que faz a requisição à API.
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState({ filterByName: { name: '' } }); // formato exigido pelo requisito.

  const verifyNameFilter = (namePlanet) => {
    if (namePlanet.length > 0) {
      const filterNamePlanet = planets.filter((planet) => planet.name
        .toLowerCase().includes(namePlanet));
      setPlanets(filterNamePlanet);
    } else {
      setPlanets(infoAPI);
    }
  };

  useEffect(() => {
    setPlanets(infoAPI);
  }, [infoAPI]); // chama infoAPI no segundo parâmetro, porque funciona como um
  // didComponentUpdate, rodando sempre que houver mudança nessa variável.

  const handleChangeName = ({ target: { value } }) => {
    setFilter({
      ...filter,
      filterByName: { name: value },
    }); // coloca no objeto do name o valor digitado no input.
    verifyNameFilter(value); // chama a função que verifica as condições do filtro, com o mesmo valor digitado no input.
  };

  const context = {
    planets,
    handleChangeName,
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
