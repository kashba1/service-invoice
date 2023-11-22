import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api501Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.NOT_IMPLEMENT) {
        super(httpStatusCodes.NOT_IMPLEMENT, description);
    }
}

export default Api501Error;
