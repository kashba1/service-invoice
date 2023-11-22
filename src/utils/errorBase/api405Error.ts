import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api405Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.METHOD_NOT_ALLOW) {
        super(httpStatusCodes.METHOD_NOT_ALLOW, description);
    }
}

export default Api405Error;
