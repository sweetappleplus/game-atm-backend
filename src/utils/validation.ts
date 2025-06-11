export const validateAmount = (amount: any) => {
  if (!amount) {
    throw new Error("Amount is required.");
  }
  if (typeof amount !== "number") {
    throw new Error("Amount must be a number.");
  }
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }
};

export const validateUserId = (userId: any, field: string = "User ID") => {
  if (!userId) {
    throw new Error(`${field} is required.`);
  }
  if (typeof userId !== "number") {
    throw new Error(`${field} must be a number.`);
  }
  if (userId <= 0) {
    throw new Error(`${field} must be greater than zero.`);
  }
};

export const validateUsername = (username: any) => {
  if (!username) {
    throw new Error("Username is required.");
  }
  if (typeof username !== "string") {
    throw new Error("Username must be a string.");
  }
  if (username.length < 3) {
    throw new Error("Username must be at least 3 characters long.");
  }
};
