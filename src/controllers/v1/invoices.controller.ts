import { NextFunction, Response } from "express";
import HTTP_STATUS_CODE from "../../utils/httpStatusCodes";
import { successRes } from "../../utils/successBase/response";
import { API_RESPONSE_MESSAGE } from "../../utils/constant";
import Api400Error from "../../utils/errorBase/api400Error";
import redisUtils from "../../utils/redisKeys";
import { getCache, setCache } from "../../repository/redis.repository";
import { createInvoice } from "../../repository/invoices.repository";
import { getBusinessDetail, getCustomerDetail, getInvoiceDetail } from "./common.controller";
import { signupBusiness } from "./business.controller";
import { signupCustomer } from "./customer.controller";

const generateRandomOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

export const sendOtp = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { mobile_number } = req.body;

        const generatedOtp = 1234; //generateRandomOtp();
        let key = redisUtils["OTP_DATA"] + mobile_number;
        let keyExpiryTime = redisUtils["OTP_EXPIRE_TIME"];
        console.log(key);
        await setCache(key, generatedOtp, keyExpiryTime);
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({ generatedOtp }, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { mobile_number, otp } = req.body;

        let key = redisUtils["OTP_DATA"] + mobile_number;
        const cachedOtp = await getCache(key);
        console.log(cachedOtp);
        if(cachedOtp !== otp) {
            throw new Api400Error(API_RESPONSE_MESSAGE.INVALID);
        }
        // jwt logic here
        // const token = jwt.sign({ mobileNumber }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
}

export const signupInvoice = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { name, mobile_number, invoice_type, email, pan, gst_no, address } = req.body;
        
        let invoice: any = await getInvoiceDetail(mobile_number);
        
        // TO-DO: check if business or customer role exists and which account creation request is this.
        if(invoice && invoice.length) {
            throw new Api400Error(API_RESPONSE_MESSAGE.RECORD_ALREADY_EXISTS);
        }
        const newInvoice = {
            name,
            mobile_number,
            invoice_type,
            status: '1',
        };

        const createdInvoice = await createInvoice(newInvoice);

        const invoice_id: any = createdInvoice?.dataValues.invoice_id;

        if (invoice_type === 'business') {
            await Promise.all([
                signupBusiness(invoice_id, address, email, pan, gst_no),
                signupCustomer(invoice_id, email)
            ]);
        } else if (invoice_type === 'customer') {
            await signupCustomer(invoice_id, email);
        } else {
            // TO-DO: complete employee part
            console.log("pending");
        }
        
        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS));
    } catch (error) {
        next(error);
    }
}

export const signInInvoice = async (req: any, res: Response, next: NextFunction) => {
    try {
         const  { mobile_number, invoice_type } = req.body;

         let invoice: any = await getInvoiceDetail(mobile_number);
        
        // TO-DO: check if business or customer role exists and which account creation request is this.
        if(!(invoice && invoice.length)) {
            throw new Api400Error(API_RESPONSE_MESSAGE.NOT_FOUND);
        }
        
        if(invoice_type === "business"){
            //get business id & check if business exists or not
            
            const businessData : any = await getBusinessDetail(invoice[0].invoice_id)
            
            if(!(businessData && businessData.length)){
                throw new Api400Error(API_RESPONSE_MESSAGE.NOT_FOUND);
            }
            
        }
        else if(invoice_type === "customer"){
            //successful login
            const customerData : any = await getCustomerDetail(invoice[0].invoice_id)
            if(!(customerData && customerData.length)){
                throw new Api400Error(API_RESPONSE_MESSAGE.NOT_FOUND);
            }
        }

        return res.status(HTTP_STATUS_CODE.OK).send(successRes({}, API_RESPONSE_MESSAGE.SUCCESS))

        }catch (error) {
        next(error);
    }
}