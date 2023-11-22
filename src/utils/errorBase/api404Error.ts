import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api404Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.NOT_FOUND) {
        super(httpStatusCodes.NOT_FOUND, description);
    }
}

export default Api404Error;
