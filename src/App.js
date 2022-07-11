import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import InputFilterName from './components/InputFilterName';
import TablePlanets from './components/TablePlanets';
import NumericFilters from './components/NumericFilters';

function App() {
  return (
    <div>
      <h1>Projeto StarWars</h1>
      <PlanetsProvider>
        <InputFilterName />
        <NumericFilters />
        <TablePlanets />
      </PlanetsProvider>
    </div>
  );
}

export default App;
