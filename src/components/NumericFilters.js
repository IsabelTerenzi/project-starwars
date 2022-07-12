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

  const [comlumnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const [isFiltered, setIsFiltered] = useState(false);

  const handleNumericChange = ({ target: { value, name } }) => {
    setNumericInput({
      ...numericInput,
      [name]: value,
    });
  };

  const handleClick = () => {
    handleNumericClick(numericInput);
    setIsFiltered(true);
    const disableInput = comlumnOptions
      .filter((option) => option !== numericInput.column);
    setColumnOptions(disableInput); // filtra as opções da coluna para que não seja possível selecionar novamente a mesma opção para um segundo filtro.
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
      { isFiltered && (
        <div className="filter">
          <p>{ numericInput.column }</p>
          <p>{ numericInput.comparison }</p>
          <p>{ numericInput.value }</p>
          <button type="button">X</button>
        </div>
      )}
    </div>
  );
}

export default NumericFilters;
