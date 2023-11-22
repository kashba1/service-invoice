import { DataTypes, Sequelize } from "sequelize";
import { getDbConnection } from "../database";
import { BusinessFields } from "./Interface";

export function getBusinessModel() {
    return getDbConnection().define<BusinessFields>(
        "business",
        {
            business_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            invoice_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gst_no: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pan: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("1", "0"),
                defaultValue: "1",
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
}
