const VALIDATION_MSGS = (fieldName: string) => ({
  MUST_BE_STRING: `${fieldName} must be a string`,
  MUST_BE_NUMBER: `${fieldName} must be a number`,
  MUST_BE_BOOLEAN: `${fieldName} must be a boolean (true or false)`,
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
    TIMEZONE: {
      ...VALIDATION_MSGS("timezone"),
      INVALID: "timezone name does not exist",
    },
    NUM_DAILY_WORDS: VALIDATION_MSGS("numDailyWords"),
  },
};

export const WORD = {
  NOT_FOUND: "word not found",
  DUPLICATE_WORD: "word already exists",
  FORM: {
    WORD: VALIDATION_MSGS("word"),
    TRANSLATION: VALIDATION_MSGS("translation"),
    KNOWLEDGE: VALIDATION_MSGS("knowledge"),
    RELEVANCE: VALIDATION_MSGS("relevance"),
    COLLECTION_ID: VALIDATION_MSGS("collectionId"),
    IS_SEEN: VALIDATION_MSGS("isSeen"),
  },
};

export const COLLECTION = {
  NOT_FOUND: "collection not found",
  DUPLICATE_COLLECTION: "collection already exists",
  FORM: {
    NAME: VALIDATION_MSGS("name"),
  },
};
