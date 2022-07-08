import React from 'react';

function InputFilterName() {
  return (
    <label htmlFor="input-filter">
      Search:
      <input
        data-testid="name-filter"
        id="input-filter"
        name="input-filter"
        type="text"
      />
    </label>
  );
}

export default InputFilterName;
