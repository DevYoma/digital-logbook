import { render, screen } from '@testing-library/react'
import { Register } from '../../src/pages'
import { BrowserRouter } from 'react-router-dom'

test("All input fields should be empty on initial pageload", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    )   

    const emailInputEl = screen.getByPlaceholderText(/email/i)
    const passwordInputEl = screen.getByTestId("password")
    const confirmPasswordInputEl = screen.getByTestId("confirm-password")
    const studentNameInputEl = screen.getByPlaceholderText(/student name/i);
    const schoolNameInputEl = screen.getByPlaceholderText(/school name/i);
    const departmentInputEl = screen.getByPlaceholderText(/department/i);

    expect(emailInputEl && passwordInputEl && confirmPasswordInputEl && studentNameInputEl && schoolNameInputEl && departmentInputEl).toHaveValue("")
})

test("Register Button should be disabled until user enters value in input elements", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    )

    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeDisabled();
})

// test("All inputs should change value when the user types in it", () => {
//     render(  
//         <BrowserRouter>
//             <Register />
//         </BrowserRouter>
//     )

//     const emailInputEl = screen.getByPlaceholderText(/email/i)
//     const passwordInputEl = screen.getByTestId("password")
//     const confirmPasswordInputEl = screen.getByTestId("confirm-password")
//     const studentNameInputEl = screen.getByPlaceholderText(/student name/i);
//     const schoolNameInputEl = screen.getByPlaceholderText(/school name/i);
//     const departmentInputEl = screen.getByPlaceholderText(/department/i);


// })