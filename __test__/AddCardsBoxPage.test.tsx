import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddWordsPage from '../components/AddWordsPage';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const mockCardsBox = [
    { label: 'Box 1', number: 1, id: 1 },
    { label: 'Box 2', number: 2, id: 2 },
];

describe('AddWordsPage', () => {
    beforeEach(() => {
        // Mock window.innerHeight
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 1000,
        });

        // Mock ResizeObserver
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn(),
        }));
    });

    it('renders the component correctly', () => {
        render(<AddWordsPage cardsBox={mockCardsBox} />);

        expect(screen.getByPlaceholderText('Enter The Word...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter the Description...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter the Example...')).toBeInTheDocument();
        expect(screen.getByLabelText('Select Tag')).toBeInTheDocument();
        expect(screen.getByLabelText('Search for Box Cards')).toBeInTheDocument();
    });

    it('displays error messages when required fields are empty', () => {
        render(<AddWordsPage cardsBox={mockCardsBox} />);

        const form = screen.getByTestId('add-words-form');
        fireEvent.submit(form);

        expect(screen.getByText('Word is required!')).toBeInTheDocument();
        expect(screen.getByText('Description is required!')).toBeInTheDocument();
        expect(screen.getByText('Example is required!')).toBeInTheDocument();
        expect(screen.getByText('Please select a type')).toBeInTheDocument();
        expect(screen.getByText('Please select a Card Box')).toBeInTheDocument();
    });

    it('clears error messages when entering valid data', () => {
        render(<AddWordsPage cardsBox={mockCardsBox} />);

        const form = screen.getByTestId('add-words-form');
        fireEvent.submit(form);

        const wordInput = screen.getByPlaceholderText('Enter The Word...');
        const descriptionInput = screen.getByPlaceholderText('Enter the Description...');
        const exampleInput = screen.getByPlaceholderText('Enter the Example...');
        const typeSelect = screen.getByLabelText('Select Tag');
        const cardBoxSelect = screen.getByLabelText('Search for Box Cards');

        fireEvent.change(wordInput, { target: { value: 'Test Word' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        fireEvent.change(exampleInput, { target: { value: 'Test Example' } });
        fireEvent.change(typeSelect, { target: { value: 'Verb' } });
        fireEvent.change(cardBoxSelect, { target: { value: 'Box 1' } });

        fireEvent.submit(form);

        expect(screen.queryByText('Word is required!')).not.toBeInTheDocument();
        expect(screen.queryByText('Description is required!')).not.toBeInTheDocument();
        expect(screen.queryByText('Example is required!')).not.toBeInTheDocument();
        expect(screen.queryByText('Please select a type')).not.toBeInTheDocument();
        expect(screen.queryByText('Please select a Card Box')).not.toBeInTheDocument();
    });

    it('updates state when typing in the input fields', () => {
        render(<AddWordsPage cardsBox={mockCardsBox} />);

        const wordInput = screen.getByPlaceholderText('Enter The Word...');
        const descriptionInput = screen.getByPlaceholderText('Enter the Description...');
        const exampleInput = screen.getByPlaceholderText('Enter the Example...');

        fireEvent.change(wordInput, { target: { value: 'Test Word' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        fireEvent.change(exampleInput, { target: { value: 'Test Example' } });

        expect(wordInput).toHaveValue('Test Word');
        expect(descriptionInput).toHaveValue('Test Description');
        expect(exampleInput).toHaveValue('Test Example');
    });

    it('updates type and cardBox state when selecting from dropdowns', () => {
        render(<AddWordsPage cardsBox={mockCardsBox} />);

        const typeSelect = screen.getByLabelText('Select Tag');
        const cardBoxSelect = screen.getByLabelText('Search for Box Cards');

        fireEvent.change(typeSelect, { target: { value: 'Verb' } });
        fireEvent.change(cardBoxSelect, { target: { value: 'Box 1' } });

        expect(typeSelect).toHaveValue('Verb');
        expect(cardBoxSelect).toHaveValue('Box 1');
    });
});
