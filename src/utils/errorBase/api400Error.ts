import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api400Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.BAD_REQUEST) {
        super(httpStatusCodes.BAD_REQUEST, description);
    }
}

export default Api400Error;
