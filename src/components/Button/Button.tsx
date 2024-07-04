import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode; // Button content
  variant?: "primary" | "secondary" | "outline"; // Button variant
  disabled?: boolean; // Disable button functionality
  onClick?: () => void; // Function to call on click
}

const Button = ({ children, variant="primary", disabled, onClick }: ButtonProps) => {
    const buttonClasses = `button button--${variant} ${disabled ? 'disabled' : ''}`
  return (
    <button 
        onClick={onClick} 
        disabled={disabled}
        className={buttonClasses}
    >
        {children}
    </button>
  )
}

export default Button