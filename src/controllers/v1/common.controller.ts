import { getBusinesses } from "../../repository/business.repository";
import { getCustomers } from "../../repository/customer.repository";
import { getInvoices } from "../../repository/invoices.repository";

export const getInvoiceDetail = (mobile_number: number) => {
    return new Promise( async (resolve, reject) => {
        try {
            let condition = {
                attributes: ['invoice_id', 'name'],
                raw: true,
                where: {
                    mobile_number,
                    status: '1',
                }
            }
            let result = await getInvoices(condition);
            console.log(result);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }
)};
export const getBusinessDetail = (invoice_id: number) => {
    return new Promise( async (resolve, reject) => {
        try {
            let condition = {
                attributes: ['business_id'],
                raw: true,
                where: {
                    invoice_id,
                    status: '1',
                }
            }
            let result = await getBusinesses(condition);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }
)};
export const getCustomerDetail = (invoice_id: number) => {
    return new Promise( async (resolve, reject) => {
        try {
            let condition = {
                attributes: ['customer_id'],
                raw: true,
                where: {
                    invoice_id,
                    status: '1',
                }
            }
            let result = await getCustomers(condition);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }
)};