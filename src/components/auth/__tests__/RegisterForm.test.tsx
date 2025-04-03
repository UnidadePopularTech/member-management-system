import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../RegisterForm';

describe('RegisterForm', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  it('renders all form fields and submit button', () => {
    render(<RegisterForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<RegisterForm />);
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab(); // Trigger blur event
    
    // Trigger form validation
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates password requirements', async () => {
    render(<RegisterForm />);
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    await userEvent.type(passwordInput, 'weak');
    await userEvent.tab();
    
    // Use click instead of submit
    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/password must contain at least one uppercase letter/i)).toBeInTheDocument();
      expect(screen.getByText(/password must contain at least one number/i)).toBeInTheDocument();
      expect(screen.getByText(/password must contain at least one special character/i)).toBeInTheDocument();
    });
  });

  it('validates password confirmation match', async () => {
    render(<RegisterForm />);
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    await userEvent.type(passwordInput, 'StrongP@ss123');
    await userEvent.type(confirmPasswordInput, 'DifferentP@ss123');
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
    });
  });

  it('handles successful form submission', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'Registration successful' })
    });
    global.fetch = mockFetch;
    
    // Mock window.location properly
    const mockAssign = jest.fn();
    const mockLocation = {
      assign: mockAssign,
    } as unknown as Location;
    
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'StrongP@ss123');
    await userEvent.type(confirmPasswordInput, 'StrongP@ss123');
    
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'StrongP@ss123',
        }),
      });
      expect(mockAssign).toHaveBeenCalledWith('/auth/login');
    });
  });

  it('handles server error during submission', async () => {
    const errorMessage = 'Email already exists';
    const mockFetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage })
      })
    );
    global.fetch = mockFetch;

    render(<RegisterForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'StrongP@ss123');
    await userEvent.type(confirmPasswordInput, 'StrongP@ss123');
    
    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
}); 