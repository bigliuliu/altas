const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^\+?1?\s*[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const isValidEmail = (email:string) => {
    return emailRegex.test(email);
  };
 export  const isValidPhoneNumber = (phoneNumber:string) => {
  return phoneNumberRegex.test(phoneNumber);
}; 