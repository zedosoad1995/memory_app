export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SALT_ROUNDS: number;
    }
  }
}
