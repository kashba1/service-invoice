import { Request, Response, NextFunction } from "express";
import HTTP_STATUS_CODE from "../httpStatusCodes";

const returnSuccess = (data: any, req: Request, res: Response, next: NextFunction) => {
    res.status(data.statusCode || HTTP_STATUS_CODE.NO_CONTENT);
    res.json(data);
};

export default returnSuccess;
