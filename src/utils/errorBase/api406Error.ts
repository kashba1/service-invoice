import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api406Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.NOT_ACCEPTABLE) {
        super(httpStatusCodes.NOT_ACCEPTABLE, description);
    }
}

export default Api406Error;
