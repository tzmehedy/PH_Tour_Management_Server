import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
  PORT: string;
  DATABASE_URL: string;
  NODE_DEV: "development" | "production";
  JWT_ACCESS_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_SECRET_KEY:string;
  JWT_REFRESH_EXPIRES_IN:string;
  SALT_COUNT: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
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
    JWT_REFRESH_SECRET_KEY:process.env.JWT_REFRESH_SECRET_KEY as string,
    JWT_REFRESH_EXPIRES_IN:process.env.JWT_REFRESH_EXPIRES_IN as string,
    SALT_COUNT: process.env.SALT_COUNT as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

export const envVars = loadEnvVars();
