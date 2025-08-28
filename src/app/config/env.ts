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
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  EXPRESS_SESSION: string;
  FRONTEND_URL: string;
  SSL: {
    SSL_COMMERZ_STORE_ID: string;
    SSL_COMMERZ_STORE_PASS: string;
    SSL_COMMERZ_PAYMENT_API: string;
    SSL_COMMERZ_VALIDATION_API: string;

    SSL_COMMERZ_BACKEND_SUCCESS_URL: string;
    SSL_COMMERZ_BACKEND_FAILED_URL: string;
    SSL_COMMERZ_BACKEND_CANCEL_URL: string;

    SSL_COMMERZ_FRONTEND_SUCCESS_URL: string;
    SSL_COMMERZ_FRONTEND_FAILED_URL: string;
    SSL_COMMERZ_FRONTEND_CANCEL_URL: string;
  };

  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
}

const loadEnvVars = (): IEnvConfig => {
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
    "SSL_COMMERZ_STORE_ID",
    "SSL_COMMERZ_STORE_PASS",
    "SSL_COMMERZ_PAYMENT_API",
    "SSL_COMMERZ_VALIDATION_API",

    "SSL_COMMERZ_BACKEND_SUCCESS_URL",
    "SSL_COMMERZ_BACKEND_FAILED_URL",
    "SSL_COMMERZ_BACKEND_CANCEL_URL",

    "SSL_COMMERZ_FRONTEND_SUCCESS_URL",
    "SSL_COMMERZ_FRONTEND_FAILED_URL",
    "SSL_COMMERZ_FRONTEND_CANCEL_URL",

    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ];

  requiredEnvVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require env variables ${key}`);
    }
  });
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

    SSL: {
      SSL_COMMERZ_STORE_ID: process.env.SSL_COMMERZ_STORE_ID as string,
      SSL_COMMERZ_STORE_PASS: process.env.SSL_COMMERZ_STORE_PASS as string,
      SSL_COMMERZ_PAYMENT_API: process.env.SSL_COMMERZ_PAYMENT_API as string,
      SSL_COMMERZ_VALIDATION_API: process.env
        .SSL_COMMERZ_VALIDATION_API as string,

      SSL_COMMERZ_BACKEND_SUCCESS_URL: process.env
        .SSL_COMMERZ_BACKEND_SUCCESS_URL as string,
      SSL_COMMERZ_BACKEND_FAILED_URL: process.env
        .SSL_COMMERZ_BACKEND_FAILED_URL as string,
      SSL_COMMERZ_BACKEND_CANCEL_URL: process.env
        .SSL_COMMERZ_BACKEND_CANCEL_URL as string,

      SSL_COMMERZ_FRONTEND_SUCCESS_URL: process.env
        .SSL_COMMERZ_FRONTEND_SUCCESS_URL as string,
      SSL_COMMERZ_FRONTEND_FAILED_URL: process.env
        .SSL_COMMERZ_FRONTEND_FAILED_URL as string,
      SSL_COMMERZ_FRONTEND_CANCEL_URL: process.env
        .SSL_COMMERZ_FRONTEND_CANCEL_URL as string,
    },

    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },
  };
};

export const envVars = loadEnvVars();
