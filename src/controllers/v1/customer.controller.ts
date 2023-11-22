import { NextFunction, Response } from "express";
import Api400Error from "../../utils/errorBase/api400Error";
import { API_RESPONSE_MESSAGE } from "../../utils/constant";
import { createCustomer } from "../../repository/customer.repository";

export const signupCustomer = async (invoice_id: number, email: string) => {
    try {
        // TO-DO: check for uniqueness of Customer

        const newCustomer = {
            invoice_id,
            email,
            status: '1'
        }

        await createCustomer(newCustomer);
    } catch (error) {
        throw error;
    }
};
