import { NextFunction, Request, Response } from "express";

export const logError = (err: any): void => {
    console.log(err);
};

export const logErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
    logError(err);
    next(err);
};

export const returnError = (err: any, req: any, res: Response, next: NextFunction): any => {
    console.log(err);
    let status: number;
    let response: any;
    if (Array.isArray(err)) {
        status = err[0].statusCode || 400;
        response = {
            success: false,
            errors: [],
        };
        for (let i = 0; i < err.length; i++) {
            response.errors.push({
                message: err[i].message,
                statusCode: err[i].status || 400,
            });
        }
    } else {
        if (err.response) {
            err.statusCode = err.response.status;
            err.message = err.response.data.errors.message ? err.response.data.errors.message : err.response.data;
        }
        status = err.statusCode || 400;
        response = {
            success: false,
            errors: {
                message: err.message,
                statusCode: status,
            },
        };
    }
    if (req.auth) {
        response.auth = req.auth;
    }
    req.isError = true;
    return res.status(status).send(response);
};

export const notFound = (req: any, res: Response, next: NextFunction): any => {
    if (req.isError) {
        return next();
    }
    const status = 404;
    return res.status(status).send({
        success: false,
        errors: {
            message: "Route not found",
            statusCode: status,
        },
    });
};

export const isOperationalError = (error: any): boolean => {
    if (error) {
        return error.isOperational;
    }
    return false;
};
