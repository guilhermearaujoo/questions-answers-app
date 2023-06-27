import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useRouter } from 'next/router';
import { enquetes } from './__mocks__/Enquetes.mock';
import { respostas, singleResposta } from './__mocks__/Resposta.mock';
import RespostasPage from '../pages/enquete/[id].tsx';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

useRouter.mockImplementation(() => ({
  query: { id: '1' },
}));

describe('Testa pagina de respostas', () => {
  it('renders the Respostas app', () => {
    render(<RespostasPage />);

    expect(screen.getByTestId('input-resposta')).toBeInTheDocument();
    expect(screen.getByTestId('add-resposta')).toBeInTheDocument();
  });

  it('Shows the resposta list', async () => {
    global.fetch = jest.fn();

    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(respostas),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(enquetes[0]),
      });

    render(<RespostasPage />);

    await waitFor(() => {
      respostas.forEach((resposta, index) => {
        const pergunta = screen.getByTestId(`resposta-${index + 1}`);
        expect(pergunta).toBeInTheDocument();
        expect(pergunta).toHaveTextContent(resposta.resposta);
      });
      expect(screen.getByText(enquetes[0].pergunta)).toBeInTheDocument();
    });
  });

  it('Adds a new resposta', async () => {
    global.fetch = jest.fn();

    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(respostas),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(respostas),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(enquetes[0]),
      });

    render(<RespostasPage />);

    const inputResposta = screen.getByTestId('input-resposta');
    const addResposta = screen.getByTestId('add-resposta');

    await waitFor(() => {
      expect(inputResposta).toBeInTheDocument();
      expect(addResposta).toBeInTheDocument();
    });

    const newResposta = singleResposta.resposta;
    userEvent.type(inputResposta, newResposta);
    addResposta.click();

    await waitFor(() => {
      expect(screen.getByText(singleResposta.resposta)).toBeInTheDocument();
    });
  });

  it('Deletes an resposta', async () => {
    global.fetch = jest.fn();

    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(respostas),
      })
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue([]),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(enquetes[0]),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue([]),
      });

    render(<RespostasPage />);

    const deleteResposta = await screen.findByTestId('delete-resposta-1');

    await waitFor(() => {
      expect(deleteResposta).toBeInTheDocument();
    });

    userEvent.click(deleteResposta);

    await waitFor(() => {
      expect(deleteResposta).not.toBeInTheDocument();
    });
    screen.debug();
  });

  afterEach(() => jest.clearAllMocks());
});
