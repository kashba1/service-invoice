import { BusinessFields, CustomersFields } from "../models/Interface";
import { getBusinessModel } from "../models/business.model";
import { getCustomersModel } from "../models/customers.model";

export async function getCustomers(condition: any = {}): Promise<CustomersFields[] | []> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getCustomersModel().findAll(condition);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

export async function createCustomer(businessData: any): Promise<CustomersFields | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getCustomersModel().create(businessData);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}