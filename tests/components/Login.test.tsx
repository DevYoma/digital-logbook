import { fireEvent, render, screen } from '@testing-library/react'
import { Login } from '../../src/pages'
import { BrowserRouter } from 'react-router-dom'

// Test for Login Component following TDD approach(how it would be when creating the component)

test("Email and Password input fields should be empty on page load", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )

  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  expect(emailInputEl).toHaveValue("");
  expect(passwordInputEl).toHaveValue("");
})

test("Login Button should be disabled until user enters value in input elements", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("Email input should change value when user types in it", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const testValue = "test";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl).toHaveValue(testValue);
});

test("Password input should change value when user types in it", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )

  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const passwordValue = "password"

  fireEvent.change(passwordInputEl, { target: { value: passwordValue } });
  expect(passwordInputEl).toHaveValue(passwordValue);
})

test("Button should not be disabled when user types in email and password input elements", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )

  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const buttonEl = screen.getByRole("button");

  const testValue = "test";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
})

test("Loading text should be displayed when user clicks on the login button", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )

  const emailInputEl = screen.getByPlaceholderText(/email/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const buttonEl = screen.getByRole("button");

  const testValue = "test";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  // onClick test simulation
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/loading/i);
})