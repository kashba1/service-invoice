import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api412Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.PRECONDITION_FAIL) {
        super(httpStatusCodes.PRECONDITION_FAIL, description);
    }
}

export default Api412Error;
