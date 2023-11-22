import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api401Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.UNAUTHORIZED) {
        super(httpStatusCodes.UNAUTHORIZED, description);
    }
}

export default Api401Error;
