import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarwarsContext';
import '../css/numericFilters.css';

function NumericFilters() {
  const { handleNumericClick } = useContext(StarWarsContext);

  const [numericInput, setNumericInput] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleNumericChange = ({ target: { value, name } }) => {
    setNumericInput({
      ...numericInput,
      [name]: value,
    });
  };

  const handleClick = () => {
    handleNumericClick(numericInput);
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
    </div>
  );
}

export default NumericFilters;
