import { ERROR_MESSAGE } from "../constant";
import httpStatusCodes from "../httpStatusCodes";
import BaseError from "./baseError";

class Api415Error extends BaseError {
    constructor(description: string | undefined = ERROR_MESSAGE.UNSUPPORT_MEDIA_TYPE) {
        super(httpStatusCodes.UNSUPPORT_MEDIA_TYPE, description);
    }
}

export default Api415Error;
