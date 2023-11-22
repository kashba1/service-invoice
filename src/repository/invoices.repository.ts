
import { getInvoicesModel } from "../models/invoices.model";

import { InvoicesFields } from "../models/Interface"

export async function getInvoices(condition: any = {}): Promise<InvoicesFields[] | []> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getInvoicesModel().findAll(condition);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

export async function createInvoice(invoiceData: any): Promise<InvoicesFields | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const createdInvoice = await getInvoicesModel().create(invoiceData);
            resolve(createdInvoice);
        } catch (err) {
            reject(err);
        }
    });
}
