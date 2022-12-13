import dotenv from 'dotenv'

dotenv.config();

export const {app_port,DB_URL,JWT_SECRET} = process.env;
export const {app_p} = process.env;

