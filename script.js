document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup');
    const MIN_USERNAME_LENGTH = 3;
    const MAX_USERNAME_LENGTH = 25;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        const usernameValidationResult = isValidUsername(usernameInput.value);
        if (usernameValidationResult !== true) {
            setFieldError(usernameInput, usernameValidationResult);
        } else {
            setFieldSuccess(usernameInput);
        }

        if (!isValidEmail(emailInput.value)) {
            setFieldError(emailInput, 'The email is mandatory and must be valid.');
        } else {
            setFieldSuccess(emailInput);
        }

        const passwordValidationResult = isValidPassword(passwordInput.value);
        if (passwordValidationResult !== true) {
            setFieldError(passwordInput, passwordValidationResult);
        } else {
            setFieldSuccess(passwordInput);
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            setFieldError(confirmPasswordInput, 'Passwords must be the same!');
        } else {
            setFieldSuccess(confirmPasswordInput);
        }
    });

    const isValidUsername = (username) => {
        const trimmedUsername = username.trim();

        if (trimmedUsername === '') {
            return 'Required field!';
        } else if (trimmedUsername.length < MIN_USERNAME_LENGTH || trimmedUsername.length > MAX_USERNAME_LENGTH) {
            return 'User must have between 3 and 25 characters.';
        } else {
            return true;
        }
    };

    const isValidEmail = (email) => email.trim() !== '' && /\S+@\S+\.\S+/.test(email);

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password) || 'Password must contain 1 lowercase character, 1 uppercase character, 1 number and at least one special character in this set (!@#$%^&*).';
    };

    const setFieldError = (inputElement, errorMessage) => {
        const parentField = inputElement.parentElement;
        parentField.classList.remove('success');
        parentField.classList.add('error');
        const smallElement = parentField.querySelector('small');
        smallElement.textContent = errorMessage;
        smallElement.style.color = 'red';
    };

    const setFieldSuccess = (inputElement) => {
        const parentField = inputElement.parentElement;
        parentField.classList.remove('error');
        parentField.classList.add('success');
        const smallElement = parentField.querySelector('small');
        smallElement.textContent = '';
    };
});
