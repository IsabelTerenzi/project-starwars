import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import InputFilterName from './components/InputFilterName';
import TablePlanets from './components/TablePlanets';

function App() {
  return (
    <div>
      <h1>Projeto StarWars</h1>
      <PlanetsProvider>
        <InputFilterName />
        <TablePlanets />
      </PlanetsProvider>
    </div>
  );
}

export default App;
