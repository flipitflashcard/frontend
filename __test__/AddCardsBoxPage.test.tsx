import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddCardsBoxPage from '../components/AddCardsBoxPage';

// Mock the useRouter hook
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('AddCardsBoxPage', () => {
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
        render(<AddCardsBoxPage />);

        expect(screen.getByPlaceholderText('Enter The name...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /discard/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    it('displays error message when submitting empty topic', () => {
        render(<AddCardsBoxPage />);

        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        expect(screen.getByText('Name is required!')).toBeInTheDocument();
    });

    it('clears error message when entering a topic', () => {
        render(<AddCardsBoxPage />);

        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        const inputField = screen.getByPlaceholderText('Enter The name...');
        fireEvent.change(inputField, { target: { value: 'Test Topic' } });
        fireEvent.click(saveButton);

        expect(screen.queryByText('Name is required!')).not.toBeInTheDocument();
    });

    it('calls router.push when clicking Discard button', () => {
        const push = jest.fn();
        jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
            push,
        }));

        render(<AddCardsBoxPage />);

        const discardButton = screen.getByRole('button', { name: /discard/i });
        fireEvent.click(discardButton);

        expect(push).toHaveBeenCalledWith('/home');
    });

    it('updates topic state when typing in the input field', () => {
        render(<AddCardsBoxPage />);

        const inputField = screen.getByPlaceholderText('Enter The name...');
        fireEvent.change(inputField, { target: { value: 'New Topic' } });

        expect(inputField).toHaveValue('New Topic');
    });
});