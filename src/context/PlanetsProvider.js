import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarwarsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]); // estado que irá receber o resultado do fetch da API.
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  }); // formato exigido pelo requisito.
  const [planetsFiltered, setPlanetsFiltered] = useState([]); // foi necessário criar mais um array, para não cair em looping e setar esse como o array que irá ser filtrado.

  useEffect(() => {
    const fetchAPI = async () => {
      const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(URL);
      const { results } = await response.json();
      const filteredResidents = results.filter((result) => result !== 'residents');
      setPlanets(filteredResidents);
      setPlanetsFiltered(filteredResidents);
    };
    fetchAPI(); // boa prática criar uma função dentro do useEffect e depois chamá-la, ao invés de fazer o fetch na useEffect.
  }, []); // a useEffect funciona como a componentDidMount, com o segundo parâmetro vazio.

  const handleChangeName = ({ target: { value } }) => {
    const filterNamePlanet = planets.filter((planet) => planet.name
      .toLowerCase().includes(value));

    setFilter({
      ...filter,
      filterByName: { name: value },
    }); // coloca no objeto do name o valor digitado no input.
    setPlanetsFiltered(filterNamePlanet); // o novo array de planetas será esse filtrado a partir do nome.
  };

  const context = {
    planets,
    handleChangeName,
    planetsFiltered,
    filter,
    setFilter,
    setPlanetsFiltered,
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
