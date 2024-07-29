import { render, screen } from '@testing-library/react'
import Button from "../../src/components/Button/Button"

describe('Button', () => {
    it('should render the Children prop with its value when the button component is used', () => {
        render(<Button>Child Prop</Button>)

        // screen.debug();
        const buttonText = screen.getByRole('button');
        expect(buttonText).toBeInTheDocument(); // this is an assertion (custom matchers)
        expect(buttonText).toHaveTextContent(/Child Prop/i); // this is an assertion
    });

    it('should render with a disabled attribute when the disabled prop is passed', () => {
        render(
            <Button disabled>Disabled Button</Button>
        )

        // const buttonElement = screen.getByRole('button', { name: /Disabled Button/i });
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveTextContent(/Disabled Button/i);
        expect(buttonElement).toBeDisabled();
    })

    // Test Button Interaction (onClick)    
})