const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  const validateRegisterInput = ({ email, password, firstName, lastName }) => {
    const errors = [];
    if (!email || !validateEmail(email)) errors.push('Invalid email');
    if (!password || !validatePassword(password)) errors.push('Password must be at least 6 characters');
    if (!firstName) errors.push('First name is required');
    if (!lastName) errors.push('Last name is required');
    return errors;
  };
  
  module.exports = { validateRegisterInput };