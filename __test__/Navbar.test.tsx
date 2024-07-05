import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

// Mock the useRouter hook
jest.mock('next/router', () => ({
    useRouter: () => ({
        asPath: '/flip',
    }),
}));

// Mock the Link component
jest.mock('next/link', () => {
    return ({ children, ...props }: any) => {
        return <a {...props}>{children}</a>;
    };
});

describe('Navbar', () => {
    it('renders all navigation links', () => {
        render(<Navbar />);

        expect(screen.getByRole('link', { name: /setting/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /add word/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /search/i })).toBeInTheDocument();
    });

    it('applies correct opacity to SVG icons based on current path', () => {
        render(<Navbar />);

        const settingIcon = screen.getByRole('link', { name: /setting/i }).querySelector('g');
        const addWordIcon = screen.getByRole('link', { name: /add word/i }).querySelector('g');
        const homeIcon = screen.getByRole('link', { name: /home/i }).querySelector('g');
        const searchIcon = screen.getByRole('link', { name: /search/i }).querySelector('g');

        expect(settingIcon).toHaveAttribute('opacity', '0.5');
        expect(addWordIcon).toHaveAttribute('opacity', '0.5');
        expect(homeIcon).toHaveAttribute('opacity', ''); // Changed this line
        expect(searchIcon).toHaveAttribute('opacity', '0.5');
    });
});