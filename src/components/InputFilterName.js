import React, { useContext } from 'react';
import StarWarsContext from '../context/StarwarsContext';
import '../css/inputSearch.css';

function InputFilterName() {
  const { handleChangeName, filter } = useContext(StarWarsContext);
  const { filterByName: { name } } = filter;

  return (
    <div className="input">
      <label htmlFor="name-filter">
        Search:
        <input
          data-testid="name-filter"
          id="name-filter"
          name="name-filter"
          type="text"
          value={ name }
          onChange={ handleChangeName }
        />
      </label>
    </div>
  );
}

export default InputFilterName;
