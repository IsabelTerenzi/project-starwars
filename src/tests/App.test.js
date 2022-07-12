import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fetchResponse from './fetchResponse';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa a aplicação', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(fetchResponse)
    }));
  })

  afterEach(() => jest.clearAllMocks());

  it('Testa se os elementos são renderizados na tela', () => {
    render(<App />);

    const title = screen.getByRole('heading', { name: /projeto starwars/i, level: 1})
    const inputSearchByName = screen.getByTestId("name-filter");
    const inputColumn = screen.getByTestId("column-filter");
    const inputComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    expect(inputSearchByName).toBeInTheDocument();
    expect(inputColumn).toBeInTheDocument();
    expect(inputComparison).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    expect(inputSearchByName).toHaveValue('');
    expect(inputColumn).toHaveValue('population');
    expect(inputComparison).toHaveValue('maior que');
    expect(inputValue).toHaveValue(0);
  })

  it('Testa se é feita uma requisição a API de planetas e se a tabela é renderizada', async () => {
    render(<App />);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');

    const table = screen.getAllByRole('columnheader');

    expect(table).toHaveLength(13);
  })

  it('Testa o funcionamento do filtro de nome', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const inputSearchByName = screen.getByTestId("name-filter");

    userEvent.type(inputSearchByName, 'tato');

    expect(screen.getAllByTestId('name-planet')).toHaveLength(1);
  })

  it('Testa o funcionamento dos filtros de valor', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
    const inputColumn = screen.getByTestId("column-filter");
    const inputComparison = screen.getByTestId("comparison-filter");
    const inputValue = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.type(inputValue, '200000');
    userEvent.click(buttonFilter);

    expect(screen.getAllByTestId('name-planet')).toHaveLength(6);

    userEvent.selectOptions(inputColumn, 'rotation_period');
    userEvent.selectOptions(inputComparison, 'menor que');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '26')
    userEvent.click(buttonFilter);

    expect(screen.getAllByTestId('name-planet')).toHaveLength(4);

    userEvent.selectOptions(inputColumn, 'surface_water');
    userEvent.selectOptions(inputComparison, 'igual a');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '40')
    userEvent.click(buttonFilter);

    expect(screen.getAllByTestId('name-planet')).toHaveLength(1);
  })
});
