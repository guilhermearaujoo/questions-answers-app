import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { act } from 'react-dom/test-utils';
import React from 'react';
import Home from '../pages/index.tsx';
import {
  enquetes,
  newSingleEnquete,
  singleEnquete,
} from './__mocks__/Enquetes.mock';
import { respostas } from './__mocks__/Resposta.mock';

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

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

    const newEnquete = singleEnquete.pergunta;
    userEvent.type(inputEnquete, newEnquete);
    addEnquete.click();

    await waitFor(() => {
      expect(screen.getByText(singleEnquete.pergunta)).toBeInTheDocument();
    });
  });

  it('Edits an enquete', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(enquetes),
    }));

    render(<Home />);

    const editEnquete = await screen.findByTestId('edit-enquete-1');
    const textEnquete = await screen.findByTestId('text-enquete-1');
    const saveEnquete = await screen.findByTestId('save-enquete-1');

    await waitFor(() => {
      expect(editEnquete).toBeInTheDocument();
      expect(textEnquete).toBeInTheDocument();
      expect(saveEnquete).toBeInTheDocument();
    });

    userEvent.click(editEnquete);
    const inputEnquete = await screen.findByTestId('input-enquete-1');
    await waitFor(() => {
      expect(inputEnquete).toBeInTheDocument();
    });

    userEvent.clear(inputEnquete);
    userEvent.type(inputEnquete, newSingleEnquete.pergunta);
    userEvent.click(saveEnquete);

    const newInputEnquete = await screen.findByText(newSingleEnquete.pergunta);
    await waitFor(() => {
      expect(newInputEnquete).toBeInTheDocument();
    });
  });

  it('Deletes an enquete', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(enquetes),
    }));

    render(<Home />);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([]),
    }));

    const deleteEnquete = await screen.findByTestId('delete-enquete-1');

    await waitFor(() => {
      expect(deleteEnquete).toBeInTheDocument();
    });

    userEvent.click(deleteEnquete);

    await waitFor(() => {
      expect(
        screen.queryByText(singleEnquete.pergunta),
      ).not.toBeInTheDocument();
    });
  });

  it.only('Redirects to the enquete page', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(enquetes),
    }));

    mockRouter.push('/');
    render(<Home />);

    const enquete = await screen.findByTestId('text-enquete-1');

    await waitFor(() => {
      expect(enquete).toBeInTheDocument();
    });

    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(enquetes),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(enquetes),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(respostas),
      });

    act(() => {
      fireEvent.click(enquete);
    });

    expect(mockRouter).toMatchObject({
      pathname: '/enquete/1',
    });
  });

  afterEach(() => jest.clearAllMocks());
});
