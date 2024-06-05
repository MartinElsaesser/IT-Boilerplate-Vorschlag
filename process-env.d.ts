declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      // add more environment variables and their types here
    }
  }
}

export {};