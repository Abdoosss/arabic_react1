export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: minLength && hasUppercase && hasNumber && hasSymbol,
    errors: {
      minLength: !minLength ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : '',
      hasUppercase: !hasUppercase ? 'يجب أن تحتوي على حرف كبير' : '',
      hasNumber: !hasNumber ? 'يجب أن تحتوي على رقم' : '',
      hasSymbol: !hasSymbol ? 'يجب أن تحتوي على رمز خاص' : ''
    }
  };
};

export const validateEgyptianPhone = (phone) => {
  const phoneRegex = /^(\+20|0)?1[0125]\d{8}$/;
  return phoneRegex.test(phone);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const formatPhoneNumber = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Add +20 if it starts with 1 and is 10 digits
  if (cleaned.length === 10 && cleaned.startsWith('1')) {
    return '+20' + cleaned;
  }
  
  // Add +20 if it starts with 01
  if (cleaned.length === 11 && cleaned.startsWith('01')) {
    return '+20' + cleaned.substring(1);
  }
  
  return phone;
};