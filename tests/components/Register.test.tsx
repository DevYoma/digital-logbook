import { render, screen } from '@testing-library/react'
import { Register } from '../../src/pages'
import { BrowserRouter } from 'react-router-dom'

describe('Register', () => {
    it('should have the word Register as heading', () => {
        render(<BrowserRouter><Register /></BrowserRouter>)
        
        const registerText = screen.getByTestId('register-id');
        expect(registerText).toBeInTheDocument();
        expect(registerText).toHaveTextContent(/Register/i);
    })
})