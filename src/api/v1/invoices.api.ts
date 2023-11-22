import { Express } from "express";
import { authJwt, valHan, epoch, } from "../../middleware";
import { signInInvoice, signupInvoice, sendOtp, verifyOtp } from "../../controllers/v1/invoices.controller";
// import { SYNC_CONFIG } from "../../validationConfig/config";

const router = (app: Express, options: any, urlSegment: string) => {
    // app.post(`${urlSegment}/sync`, [epoch.epochCheck, authJwt.deviceAuth, vendorCheck.checkVendorinvoices, epoch.timeZoneCheck, valHan.validationHandler(SYNC_CONFIG)], multiSync);
    app.post(`${urlSegment}/signup`, signupInvoice);
    app.post(`${urlSegment}/send-otp`, sendOtp);
    app.post(`${urlSegment}/verify-otp`, verifyOtp);
    app.post(`${urlSegment}/signin`, signInInvoice);
};

export default router;
