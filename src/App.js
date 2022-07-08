import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import InputFilterName from './components/InputFilterName';
import TablePlanets from './components/TablePlanets';

function App() {
  return (
    <PlanetsProvider>
      <InputFilterName />
      <TablePlanets />
    </PlanetsProvider>
  );
}

export default App;
