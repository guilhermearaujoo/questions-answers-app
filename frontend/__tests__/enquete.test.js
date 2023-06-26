import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Home from '../pages/index.tsx';
import { enquetes } from './__mocks__/EnquetesMock';

describe('Enquete App', () => {
  it('renders the Enquete app', () => {
    render(<Home />);

    expect(screen.getByTestId('input-enquete')).toBeInTheDocument();
    expect(screen.getByTestId('add-enquete')).toBeInTheDocument();
  });

  it('Shows the enquete list', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(enquetes),
    }));

    render(<Home />);

    await waitFor(() => {
      enquetes.forEach((enquete, index) => {
        const pergunta = screen.getByTestId(`enquete-${index + 1}`);
        expect(pergunta).toBeInTheDocument();
        expect(pergunta).toHaveTextContent(enquete.pergunta);
      });
    });
  });

  it('Adds a new enquete', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(enquetes),
    }));

    render(<Home />);

    const inputEnquete = screen.getByTestId('input-enquete');
    const addEnquete = screen.getByTestId('add-enquete');

    await waitFor(() => {
      expect(inputEnquete).toBeInTheDocument();
      expect(addEnquete).toBeInTheDocument();
    });

    const newEnquete = 'Qual o melhor framework?';
    userEvent.type(inputEnquete, newEnquete);
    addEnquete.click();

    await waitFor(() => {
      expect(screen.getByText('Qual o melhor framework?')).toBeInTheDocument();
    });
  });

  afterEach(() => jest.clearAllMocks());
});
