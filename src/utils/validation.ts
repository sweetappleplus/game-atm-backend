import { ValidationError } from "./ValidationError";

export const validateAmount = (amount: any) => {
  if (!amount) {
    throw new ValidationError("Amount is required.");
  }
  if (typeof amount !== "number") {
    throw new ValidationError("Amount must be a number.");
  }
  if (amount <= 0) {
    throw new ValidationError("Amount must be greater than zero.");
  }
};

export const validateUserId = (userId: any, field: string = "User ID") => {
  if (!userId) {
    throw new ValidationError(`${field} is required.`);
  }
  if (typeof userId !== "number") {
    throw new ValidationError(`${field} must be a number.`);
  }
  if (userId <= 0) {
    throw new ValidationError(`${field} must be greater than zero.`);
  }
};

export const validateUsername = (username: any) => {
  if (!username) {
    throw new ValidationError("Username is required.");
  }
  if (typeof username !== "string") {
    throw new ValidationError("Username must be a string.");
  }
  if (username.length < 3) {
    throw new ValidationError("Username must be at least 3 characters long.");
  }
};
