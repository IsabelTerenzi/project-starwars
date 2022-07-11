import React, { useContext } from 'react';
import StarWarsContext from '../context/StarwarsContext';
import '../css/table.css';

function TablePlanets() {
  const { planetsFiltered } = useContext(StarWarsContext);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { planetsFiltered && planetsFiltered.map((planetInfo, index) => (
            <tr key={ index }>
              <td>{planetInfo.name}</td>
              <td>{planetInfo.rotation_period}</td>
              <td>{planetInfo.orbital_period}</td>
              <td>{planetInfo.diameter}</td>
              <td>{planetInfo.climate}</td>
              <td>{planetInfo.gravity}</td>
              <td>{planetInfo.terrain}</td>
              <td>{planetInfo.surface_water}</td>
              <td>{planetInfo.population}</td>
              <td>{planetInfo.films.map((film) => film)}</td>
              <td>{planetInfo.created}</td>
              <td>{planetInfo.edited}</td>
              <td>{planetInfo.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePlanets;
