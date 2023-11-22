import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api422Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.UNPROCESSABLE_ENTITY) {
        super(httpStatusCodes.UNPROCESSABLE_ENTITY, description);
    }
}

export default Api422Error;
