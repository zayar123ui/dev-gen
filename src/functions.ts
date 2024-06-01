import mongoose from "mongoose";
import { ISuccessResponse } from "./interfaces";
import bcrypt from "bcrypt";
export const showLog = async (msg: string) => {
  console.log(msg);
};

export const genOtp = async (): Promise<string> => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export const response = {
  success: (res: any, status: number, message: string, data?: any) => {
    const response: ISuccessResponse = {
      success: true,
      message,
      status: status,
    };
    if (data) response.data = data;
    res.status(status).json(response);
  },

  fail: (res: any, status: number, message: string | object) => {
    res.status(status).json({
      success: false,
      message,
      status: status,
    });
  },
  internal: (res: any, status: number, message: string, error: any) => {
    res.status(status).json({
      success: false,
      message,
      status: status,
      error,
    });
  },
};
export function isObjectId(str: string): boolean {
  return mongoose.Types.ObjectId.isValid(str);
}

export function parseObjectId(id: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(id);
}

export function parseDate(date: string): Date {
  return new Date(date);
}

export function parseBoolean(bool: string): boolean {
  return bool === "true";
}

