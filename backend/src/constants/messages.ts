const VALIDATION_MSGS = (fieldName: string) => ({
  MUST_BE_STRING: `${fieldName} must be a string`,
  MUST_BE_NUMBER: `${fieldName} must be a number`,
  MIN_VALUE: (value: number) =>
    `${fieldName} must be greater or equal to ${value}`,
  MAX_VALUE: (value: number) =>
    `${fieldName} must be less or equal to ${value}`,
  IS_REQUIRED: `${fieldName} is required`,
});

export const AUTH = {
  WRONG_CREDENTIALS: "Invalid Email or Password",
  UNAUTHENTICATED: "User is unauthenticated",
};

export const USER = {
  FORM: {
    EMAIL: { ...VALIDATION_MSGS("email"), INVALID: "email format is invalid" },
    PASSWORD: VALIDATION_MSGS("password"),
  },
};

export const WORD = {
  DUPLICATE_WORD: "Word already exists",
  FORM: {
    WORD: VALIDATION_MSGS("word"),
    TRANSLATION: VALIDATION_MSGS("translation"),
    KNOWLEDGE: VALIDATION_MSGS("knowledge"),
    RELEVANCE: VALIDATION_MSGS("relevance"),
    COLLECTION_ID: VALIDATION_MSGS("collectionId"),
  },
};
