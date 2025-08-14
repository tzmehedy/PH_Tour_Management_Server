import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
  PORT: string;
  DATABASE_URL: string;
  NODE_DEV: "development" | "production";

  JWT_ACCESS_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_SECRET_KEY: string;
  JWT_REFRESH_EXPIRES_IN: string;

  SALT_COUNT: string;
  SUPER_ADMIN_EMAIL: string
  SUPER_ADMIN_PASSWORD: string

  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GOOGLE_CALLBACK_URL: string
  EXPRESS_SESSION: string
  FRONTEND_URL: string
}

const loadEnvVars = () : IEnvConfig => {
    const requiredEnvVariable: string[] = [
      "PORT",
      "DATABASE_URL",
      "NODE_DEV",
      "SALT_COUNT",
      "SUPER_ADMIN_PASSWORD",
      "SUPER_ADMIN_EMAIL",
      "JWT_ACCESS_SECRET_KEY",
      "JWT_EXPIRES_IN",
      "JWT_REFRESH_SECRET_KEY",
      "JWT_REFRESH_EXPIRES_IN",
      "GOOGLE_CLIENT_ID",
      "GOOGLE_CLIENT_SECRET",
      "GOOGLE_CALLBACK_URL",
      "EXPRESS_SESSION",
      "FRONTEND_URL",
    ];

    requiredEnvVariable.forEach(key=>{
        if(!process.env[key]){
            throw new Error(`Missing require env variables ${key}`)
        }
    })
  return {
    DATABASE_URL: process.env.DATABASE_URL as string,
    PORT: process.env.PORT as string,
    NODE_DEV: process.env.NODE_DEV as "development" | "production",
    JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY as string,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN as string,
    SALT_COUNT: process.env.SALT_COUNT as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    EXPRESS_SESSION: process.env.EXPRESS_SESSION as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
  };
};

export const envVars = loadEnvVars()
