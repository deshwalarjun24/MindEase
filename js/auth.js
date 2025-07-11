document.addEventListener('DOMContentLoaded', function() {
    // Handle password reset request form
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const errorElement = document.getElementById('email-error');
            
            // Simple email validation
            if (!isValidEmail(email)) {
                errorElement.textContent = 'Please enter a valid email address';
                return;
            }
            
            // In a real app, you would send a request to your server here
            console.log('Password reset requested for:', email);
            
            // Show success message and redirect (simulated)
            alert('If an account exists with this email, you will receive a password reset link shortly.');
            // In a real app, you would redirect to a confirmation page
            // window.location.href = 'reset-confirmation.html';
        });
    }
    
    // Handle new password form
    const newPasswordForm = document.getElementById('newPasswordForm');
    if (newPasswordForm) {
        // Toggle password visibility
        const togglePassword = document.querySelector('.toggle-password');
        const passwordField = document.getElementById('password');
        
        if (togglePassword && passwordField) {
            togglePassword.addEventListener('click', function() {
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }
        
        // Password strength validation
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', validatePassword);
        }
        
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', validatePasswordMatch);
        }
        
        newPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!isPasswordStrong(password)) {
                alert('Please ensure your password meets all requirements');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real app, you would send the new password to your server here
            console.log('New password set');
            window.location.href = 'reset-confirmation.html';
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Password strength validation
    function validatePassword() {
        const password = this.value;
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        
        // Update UI for each requirement
        Object.keys(requirements).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.style.color = requirements[key] ? '#4CAF50' : '#666';
                element.style.textDecoration = requirements[key] ? 'line-through' : 'none';
            }
        });
    }
    
    // Password match validation
    function validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = this.value;
        const errorElement = document.getElementById('password-match-error');
        
        if (password && confirmPassword && password !== confirmPassword) {
            errorElement.textContent = 'Passwords do not match';
        } else {
            errorElement.textContent = '';
        }
    }
    
    // Check if password meets all requirements
    function isPasswordStrong(password) {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
        );
    }
});
