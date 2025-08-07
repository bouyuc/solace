export const formattedPhoneNumber = (phoneNumber: string) => {
  try {
    return String(phoneNumber).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } catch (error) {
    console.error("Error formatting phone number:", error);
    return phoneNumber;
  }
};
