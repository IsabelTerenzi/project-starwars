import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarwarsContext';
import '../css/numericFilters.css';

function NumericFilters() {
  const {
    filter,
    setFilter,
    planets,
    planetsFiltered,
    setPlanetsFiltered,
  } = useContext(StarWarsContext);
  const { filterByNumericValues } = filter;

  const [numericInput, setNumericInput] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  }); // valores iniciais dos inputs.

  const [comlumnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]); // opções iniciais do input de column.

  const [isFiltered, setIsFiltered] = useState(false); // booleano para renderizar os filtros escolhidos na tela, ao se tornarem true com o click de filtro.

  const handleNumericChange = ({ target: { value, name } }) => {
    setNumericInput({
      ...numericInput,
      [name]: value,
    });
  };

  const verifyNumericFilters = (arrayFilters, planets2) => {
    if (arrayFilters.length > 0) {
      arrayFilters.forEach(({ column, comparison, value }) => {
        const comparisonFilter = planets2.filter((planet) => {
          if (comparison === 'maior que') {
            return Number(planet[column]) > Number(value);
          }

          if (comparison === 'menor que') {
            return Number(planet[column]) < Number(value);
          }

          if (comparison === 'igual a') {
            return Number(planet[column]) === Number(value);
          }
          return null;
        });
        setPlanetsFiltered(comparisonFilter); // faz as comparações dos filtros e retorna ao array dos planetas filtrados.
      });
    }
  };

  const handleNumericClick = (filters) => {
    const arrayFilters = [...filter.filterByNumericValues, filters];// cria a constante para acumular vários filtros.
    setFilter({
      ...filter,
      filterByNumericValues: arrayFilters,
    });
    verifyNumericFilters(arrayFilters, planetsFiltered);
  };

  const handleClick = () => {
    handleNumericClick(numericInput);
    setIsFiltered(true);
    const disableOptionColumn = comlumnOptions
      .filter((option) => option !== numericInput.column);
    setColumnOptions(disableOptionColumn); // filtra as opções da coluna para que não seja possível selecionar novamente a mesma opção para um segundo filtro.
  };

  const removeOneFilter = (option) => {
    const filtro = filter.filterByNumericValues
      .filter(({ column }) => column !== option);

    if (!filtro.length) {
      setPlanetsFiltered(planets);
      setIsFiltered(false);
    } else {
      verifyNumericFilters(filtro, planets);
    }

    setFilter({
      ...filter,
      filterByNumericValues: filtro,
    }); // removendo o filtro do array de filtros.

    const newColumnOptions = [...comlumnOptions, option]; // readiciona a opção à lista de column para seleção.
    setColumnOptions(newColumnOptions);
  }; // retorna a tabela para o formato antes do filtro.

  const removeAll = () => {
    setFilter({
      ...filter,
      filterByNumericValues: [],
    }); // retorna o array para o valor inicial, ou seja, vazio.
    setPlanetsFiltered(planets); // coloca as informações vindas da API na tela novamente, já que não há nenhum filtro.
    setIsFiltered(false);
    setColumnOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]); // coloca as opções todas disponíveis novamente.
  };

  return (
    <div className="numeric-filters">
      <label htmlFor="column">
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          onChange={ handleNumericChange }
        >
          { comlumnOptions.map((option, index) => (
            <option key={ index } value={ option }>{option}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          onChange={ handleNumericChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        <input
          value={ numericInput.value }
          id="value"
          type="number"
          name="value"
          onChange={ handleNumericChange }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="button-filter"
      >
        Filtrar
      </button>
      { isFiltered && filterByNumericValues
        .map((filters, index) => ((
          <div className="filter" data-testid="filter" key={ index }>
            <p>{ filters.column }</p>
            <p>{ filters.comparison }</p>
            <p>{ filters.value }</p>
            <button
              type="button"
              onClick={ () => removeOneFilter(filters.column) }
              data-testid="remove-filter"
            >
              X
            </button>
          </div>
        )))}
      { isFiltered && (
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAll }
        >
          Remover Filtros
        </button>
      )}
    </div>
  );
}

export default NumericFilters;
