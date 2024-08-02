import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { Login } from '../../src/pages'
import { BrowserRouter, useNavigate } from 'react-router-dom'

describe('Login', () => {
    it('should show the Login text as heading', () => {
        render(<BrowserRouter><Login /></BrowserRouter>)

        const headingText = screen.getByRole('heading', { name: /Login/i });
        expect(headingText).toBeInTheDocument();
    })

    it('should change to Loading... onClick of the button', async () => {
        // userEvent.setup()
        render(<BrowserRouter><Login /></BrowserRouter>)

        
         const loginButton = screen.getByRole("button", { name: /Login/i }); // Find by name

         expect(loginButton).toBeInTheDocument();
         expect(loginButton).toHaveTextContent(/Login/i); // Verify initial content

         await userEvent.click(loginButton);

         // Assert the changed content after clicking
         await waitFor(() =>{
            expect(loginButton).toHaveTextContent(/Login/i)
            expect(loginButton).toBeInTheDocument()
         }
         );

    })
})