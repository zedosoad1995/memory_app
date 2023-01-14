const VALIDATION_MSGS = (fieldName: string) => ({
  IS_EMPTY: `${fieldName} cannot be empty`,
  MAX_LEN: (value: number) =>
    `${fieldName} cannot be longer than ${value} characters`,
});

export const USER = {
  FORM: {
    EMAIL: {
      INVALID: "email format is invalid",
      ...VALIDATION_MSGS("email"),
    },
    PASSWORD: VALIDATION_MSGS("password"),
  },
};

export const WORD = {
  FORM: {
    WORD: VALIDATION_MSGS("word"),
    TRANSLATION: VALIDATION_MSGS("translation"),
  },
};
