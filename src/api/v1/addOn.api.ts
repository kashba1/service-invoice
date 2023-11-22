import { Express, Response, NextFunction, Request } from "express";
import { authJwt } from "../../middleware";
import HTTP_STATUS_CODE from "../../utils/httpStatusCodes";
import { successRes } from "../../utils/successBase/response";

const router = (app: Express, options: any, urlSegment: string) => {
    app.get(`${urlSegment}/health-check`, async (req: any, res: Response, next: NextFunction) => {
        try {
            res.status(HTTP_STATUS_CODE.OK).json(successRes("service invoice is healthy!! :)"));
        } catch (error) {
            next(error);
        }
    });

};

export default router;
