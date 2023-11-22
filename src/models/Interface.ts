import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface InvoicesFields extends Model<InferAttributes<InvoicesFields>, InferCreationAttributes<InvoicesFields>> {
    invoice_id: CreationOptional<number>;
    name: string;
    mobile_number: string;
    invoice_type: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}

export interface BusinessFields extends Model<InferAttributes<BusinessFields>, InferCreationAttributes<BusinessFields>> {
    business_id: CreationOptional<number>;
    invoice_id: number;
    address: string;
    gst_no: string;
    email: string;
    pan: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}


export interface CustomersFields extends Model<InferAttributes<CustomersFields>, InferCreationAttributes<CustomersFields>> {
    customer_id: CreationOptional<number>;
    invoice_id: number;
    name: string;
    email: string;
    status: string;
    created_at?: string;
    updated_at?: string;
}



export interface EmployeesFields extends Model<InferAttributes<EmployeesFields>, InferCreationAttributes<EmployeesFields>> {
    employee_id: CreationOptional<number>;
    business_id: number;
    status: string;
    created_at?: string;
    updated_at?: string;
}