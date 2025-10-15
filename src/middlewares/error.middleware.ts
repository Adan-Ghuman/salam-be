import {Request,Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

const isDev = process.env.NODE_ENV === 'development';

export const errorHandler = (
    err:any,
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    let error: ApiError;

    if(err instanceof ApiError) {
        error = err;
    } else{
        error = new ApiError(
            err.statusCode || 500,
            isDev ? err.message || 'Internal Server Error': "Internal Server Error",
            err.code || 'INTERNAL_SERVER_ERROR',
            isDev ? err: undefined,
        );
    }

    logger.error({
        name: error.name,
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        ...(isDev && { details: error.details }),
        ...(isDev && { stack: error.stack }),
    });

    res.status(error.statusCode).json(error.toJSON());
}