import {Response} from 'express';

export class ApiResponse<T> {
    public success: boolean;
    public message?: string;
    public data?: T;
    public statusCode: number;
    public details?: any;

    constructor({
        success=true,
        message = "Request Successful",
        data,
        statusCode=200,
        details
    }:{
        success?: boolean,
        message?: string,
        data?: T,
        statusCode?: number,
        details?: any
    }) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.details = details; 
    }

    toJSON() {
        return {
            success: this.success,
            message: this.message,
            data: this.data,
        statusCode: this.statusCode,
    ...(process.env.NODE_ENV === "development" && this.details ? { details: this.details } : {})
    }
    }

    send(res: Response) {
        return res.status(this.statusCode).json(this.toJSON());
    }
}
