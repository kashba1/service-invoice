import { DataTypes, Sequelize } from "sequelize";
import { getDbConnection } from "../database";
import { InvoicesFields } from "./Interface";

export function getInvoicesModel() {
    const getInvoices = getDbConnection().define<InvoicesFields>(
        "invoices",
        {
            invoice_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mobile_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("1", "0"),
                defaultValue: "1",
            },
            invoice_type: {
                type: DataTypes.ENUM("business", "vendor", "employer"),
                // defaultValue: "1",
            },
            created_at: {
                type: "TIMESTAMP",
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: "TIMESTAMP",
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            freezeTableName: true,
            underscored: false,
        }
    );
    return getInvoices;
}
