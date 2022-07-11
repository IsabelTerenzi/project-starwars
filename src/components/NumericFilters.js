import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarwarsContext';
import '../css/numericFilters.css';

function NumericFilters() {
  const [inputColumn, setInputColumn] = useState('population');
  const [inputComparison, setInputComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);

  const { handleNumericClick } = useContext(StarWarsContext);

  return (
    <div className="numeric-filters">
      <label htmlFor="coluna">
        <select
          value={ inputColumn }
          id="coluna"
          name="coluna"
          data-testid="column-filter"
          onChange={ ({ target }) => setInputColumn(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="operador">
        <select
          value={ inputComparison }
          id="operador"
          name="operador"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setInputComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        <input
          value={ inputValue }
          id="value"
          type="number"
          name="value"
          onChange={ ({ target }) => setInputValue(target.value) }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ () => handleNumericClick(inputColumn, inputComparison, inputValue) }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilters;
