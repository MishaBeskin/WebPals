import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';




describe('should validate and submit login form', () => {
  test('email validation', async () => {
    await render(LoginComponent, {
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const emailControl = screen.getByRole('email');
    userEvent.clear(emailControl);
    userEvent.type(emailControl, 'm.c');
    fireEvent.blur(emailControl);

    expect(emailControl).toBeInvalid();

    const errorEmail = await screen.getByRole('alertEmail');
    expect(errorEmail).toContainElement(screen.queryByText('Please provide a valid email'));

    userEvent.clear(emailControl);
    userEvent.type(emailControl, 'm@m.com');
    fireEvent.blur(emailControl);
    expect(screen.queryByText('Please provide a valid email')).not.toBeInTheDocument();
    expect(emailControl).toBeValid();
  });

  test('password validation', async () => {
    await render(LoginComponent, {
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const passwordControl = screen.getByRole('password');
    userEvent.clear(passwordControl);
    userEvent.type(passwordControl, '12345');
    fireEvent.blur(passwordControl);

    const errorPassword = await screen.getByRole('alertPassword');
    expect(errorPassword).toContainElement(screen.queryByText('Please provide a password with min 6 characters'));
    expect(screen.queryByText('Please provide a password with min 6 characters')).toBeInTheDocument();
    userEvent.clear(passwordControl);
    userEvent.type(passwordControl, '123456');
    fireEvent.blur(passwordControl);
    expect(errorPassword).not.toBeInTheDocument();
    expect(passwordControl).toBeValid();
  });

  test('form submitted', async () => {
    await render(LoginComponent, {
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    });
    const submitButton = screen.getByRole('submit');
    const emailControl = screen.getByRole('email');
    const passwordControl = screen.getByRole('password');
    userEvent.type(emailControl, 'm@m.com');
    userEvent.type(passwordControl, '123456');

    expect(emailControl).toHaveValue('m@m.com');
    expect(passwordControl).toHaveValue('123456');

    const form = screen.getByRole('form');
    expect(form).toHaveFormValues({
      email: 'm@m.com',
      password: '123456'
    });

    fireEvent.click(submitButton);

    const user = {
      email: 'm@m.com',
      password: '123456'
    };

    const loginMockFn = jest.fn();
    loginMockFn(user);
    expect(loginMockFn).toHaveBeenCalledWith(user);
    expect(loginMockFn).toHaveBeenCalled();

  });
});






