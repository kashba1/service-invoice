import { BusinessFields } from "../models/Interface";
import { getBusinessModel } from "../models/business.model";

export async function getBusinesses(condition: any = {}): Promise<BusinessFields[] | []> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getBusinessModel().findAll(condition);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

export async function createBusiness(businessData: any): Promise<BusinessFields | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getBusinessModel().create(businessData);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}