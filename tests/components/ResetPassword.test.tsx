import { fireEvent, render, screen } from "@testing-library/react";
import { ResetPassword } from "../../src/pages";
import { BrowserRouter } from 'react-router-dom';

const renderComponent = () =>
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );

describe("Reset Password Page", () => {
    test("Forgot Email input should be empty on initial pageload", () => {
        renderComponent();

        const emailInput = screen.getByPlaceholderText(/email address/i);
        expect(emailInput).toHaveValue("");
    })

    test("Submit button is disabled if the email input is empty", () => {
        renderComponent();

        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeDisabled();
    })

    test("Email input should change as user types in it", () => {
        renderComponent();

        const emailInputEl = screen.getByPlaceholderText(/email address/i);
        const testValue = "test@example.com";

        fireEvent.change(emailInputEl, { target: { value: testValue } })
        expect(emailInputEl).toHaveValue(testValue);
    })

    test("Submit Button should not be disabled when email is entered", () => {
        renderComponent();

        const emailInputEl = screen.getByPlaceholderText(/email address/i);
        const submitButton = screen.getByRole("button");
        const testValue = "test@sample.com";

        fireEvent.change(emailInputEl, { target: { value: testValue } })
        expect(submitButton).not.toBeDisabled();
    })

    test("Loading spinner should display when the submit button is clicked", () => {
        renderComponent();

        const emailInputEl = screen.getByPlaceholderText(/email address/i);
        const submitButton = screen.getByRole("button");
        const testValue = "test@sample.com"

        fireEvent.change(emailInputEl, { target: { value: testValue } })
        fireEvent.click(submitButton);

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();
    })
})