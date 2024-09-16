import { fireEvent, render, screen } from '@testing-library/react'
import { Register } from '../../src/pages'
import { BrowserRouter } from 'react-router-dom';

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )
}

describe("Register Component", () => {
  test("All input fields should be empty on initial pageload", () => {
    renderComponent()

    const emailInputEl = screen.getByPlaceholderText(/email/i);
    const passwordInputEl = screen.getByTestId("password");
    const confirmPasswordInputEl = screen.getByTestId("confirm-password");
    const studentNameInputEl = screen.getByPlaceholderText(/student name/i);
    const schoolNameInputEl = screen.getByPlaceholderText(/school name/i);
    const departmentInputEl = screen.getByPlaceholderText(/department/i);

    expect(
      emailInputEl &&
        passwordInputEl &&
        confirmPasswordInputEl &&
        studentNameInputEl &&
        schoolNameInputEl &&
        departmentInputEl
    ).toHaveValue("");
  });

  test("Register Button should be disabled until user enters value in input elements", () => {
    renderComponent()

    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeDisabled();
  });

  test("All inputs should change value when the user types in it", () => {
    renderComponent()

    const emailInputEl = screen.getByPlaceholderText(/email/i);
    const passwordInputEl = screen.getByTestId("password");
    const confirmPasswordInputEl = screen.getByTestId("confirm-password");
    const studentNameInputEl = screen.getByPlaceholderText(/student name/i);
    const schoolNameInputEl = screen.getByPlaceholderText(/school name/i);
    const departmentInputEl = screen.getByPlaceholderText(/department/i);

    const testValue = "test";
    fireEvent.change(emailInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })
    fireEvent.change(confirmPasswordInputEl, { target: { value: testValue } })
    fireEvent.change(studentNameInputEl, { target: { value: testValue } })
    fireEvent.change(schoolNameInputEl, { target: { value: testValue } })
    fireEvent.change(departmentInputEl, { target: { value: testValue } })

    expect(emailInputEl && passwordInputEl && confirmPasswordInputEl && studentNameInputEl && schoolNameInputEl && departmentInputEl).toHaveValue(testValue);
    
  });

  test("Button should not be disabled when user types in all input elements", () => {
    renderComponent()

    const emailInputEl = screen.getByPlaceholderText(/email/i);
    const passwordInputEl = screen.getByTestId("password");
    const confirmPasswordInputEl = screen.getByTestId("confirm-password");
    const studentNameInputEl = screen.getByPlaceholderText(/student name/i);
    const schoolNameInputEl = screen.getByPlaceholderText(/school name/i);
    const departmentInputEl = screen.getByPlaceholderText(/department/i);

    const testValue = "test";
    fireEvent.change(emailInputEl, { target: { value: testValue } })
    fireEvent.change(passwordInputEl, { target: { value: testValue } })
    fireEvent.change(confirmPasswordInputEl, { target: { value: testValue } })
    fireEvent.change(studentNameInputEl, { target: { value: testValue } })
    fireEvent.change(schoolNameInputEl, { target: { value: testValue } })
    fireEvent.change(departmentInputEl, { target: { value: testValue } })

    const buttonEl = screen.getByRole("button");
    expect(buttonEl).not.toBeDisabled();
  })

  // test("Loading Spinner should be displayed when user clicks on the Create Account button", () => {
  //   renderComponent()

  //   const emailInputEl = screen.getByPlaceholderText(/email/i);
  //   const passwordInputEl = screen.getByTestId("password");
  //   const confirmPasswordInputEl = screen.getByTestId("confirm-password");
  //   const studentNameInputEl = screen.getByPlaceholderText(/student name/i);
  //   const schoolNameInputEl = screen.getByPlaceholderText(/school name/i);
  //   const departmentInputEl = screen.getByPlaceholderText(/department/i);
  //   const buttonEl = screen.getByRole("button")

  //   const testValue = "test";
  //   fireEvent.change(emailInputEl, { target: { value: testValue } });
  //   fireEvent.change(passwordInputEl, { target: { value: testValue } });
  //   fireEvent.change(confirmPasswordInputEl, { target: { value: testValue } });
  //   fireEvent.change(studentNameInputEl, { target: { value: testValue } });
  //   fireEvent.change(schoolNameInputEl, { target: { value: testValue } });
  //   fireEvent.change(departmentInputEl, { target: { value: testValue } });

  //   fireEvent.click(buttonEl);

  //   // expect(buttonEl).toHaveTextContent(/loading/i);
  //   // await waitFor(() => {
  //     expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();
  //   // });
  // });
});

// expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();