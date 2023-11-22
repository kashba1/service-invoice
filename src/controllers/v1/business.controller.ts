import { NextFunction, Response } from "express";
import { createBusiness, getBusinesses } from "../../repository/business.repository";
import Api400Error from "../../utils/errorBase/api400Error";
import { API_RESPONSE_MESSAGE } from "../../utils/constant";

export const signupBusiness = async (invoice_id: number, address: string, email: string, pan: string, gst_no: string) => {
    try {
        // TO-DO: check for uniqueness of business

        const newBusiness = {
            invoice_id,
            address,
            email,
            pan,
            gst_no,
            status: '1'
        }

        await createBusiness(newBusiness);
    } catch (error) {
        throw error;
    }
};
