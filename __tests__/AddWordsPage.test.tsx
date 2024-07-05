import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddWordsPage from '../components/AddWordsPage'

const mockCardsBox = [
    { label: 'Box 1', number: 1, id: 1 },
    { label: 'Box 2', number: 2, id: 2 },
]

describe('AddWordsPage', () => {
    it('renders the form correctly', () => {
        render(<AddWordsPage cardsBox={mockCardsBox} />)

        expect(screen.getByPlaceholderText('Enter The Word...')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter the Description...')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter the Example...')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /select tag/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /search for box cards/i })).toBeInTheDocument()
    })

    it('displays error messages when submitting empty fields', () => {
        render(<AddWordsPage cardsBox={mockCardsBox} />)

        const saveButton = screen.getByRole('button', { name: /add to cards/i })
        fireEvent.click(saveButton)

        expect(screen.getByText('Word is required!')).toBeInTheDocument()
        expect(screen.getByText('Please select a type')).toBeInTheDocument()
        expect(screen.getByText('Description is required!')).toBeInTheDocument()
        expect(screen.getByText('Example is required!')).toBeInTheDocument()
        expect(screen.getByText('Please select a Card Box')).toBeInTheDocument()
    })

    it('clears error messages when filling in fields', () => {
        render(<AddWordsPage cardsBox={mockCardsBox} />)

        const saveButton = screen.getByRole('button', { name: /add to cards/i })
        fireEvent.click(saveButton)

        const wordInput = screen.getByPlaceholderText('Enter The Word...')
        fireEvent.change(wordInput, { target: { value: 'Test Word' } })

        const typeSelect = screen.getByRole('button', { name: /select tag/i })
        fireEvent.mouseDown(typeSelect)
        const verbOption = screen.getByRole('option', { name: /verb/i })
        fireEvent.click(verbOption)

        const descriptionInput = screen.getByPlaceholderText('Enter the Description...')
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })

        const exampleInput = screen.getByPlaceholderText('Enter the Example...')
        fireEvent.change(exampleInput, { target: { value: 'Test Example' } })

        const boxSelect = screen.getByRole('button', { name: /search for box cards/i })
        fireEvent.mouseDown(boxSelect)
        const box1Option = screen.getByRole('option', { name: /box 1/i })
        fireEvent.click(box1Option)

        fireEvent.click(saveButton)

        expect(screen.queryByText('Word is required!')).not.toBeInTheDocument()
        expect(screen.queryByText('Please select a type')).not.toBeInTheDocument()
        expect(screen.queryByText('Description is required!')).not.toBeInTheDocument()
        expect(screen.queryByText('Example is required!')).not.toBeInTheDocument()
        expect(screen.queryByText('Please select a Card Box')).not.toBeInTheDocument()
    })
})
