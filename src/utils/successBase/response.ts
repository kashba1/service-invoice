/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */

import _ from 'lodash';
import { iMain } from './Interface';

export const success_v3 = (response: any = {}) => {
    return {
        success: true,
        data: response.data,
    };
};

// New Success Response Because data key is added unnecessorily
export const successRes = (response: any = {}, message: string = "", auth: any = {}) => {
    let mainResp: iMain = {
        success: true,
        data: response,
        message: message,
        time: "" + (new Date()).getTime(),
    };
    // if (!_.isEmpty(auth)) {
    //     mainResp.auth = auth;
    // }
    return mainResp;
};