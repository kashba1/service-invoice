import { DataTypes, Sequelize } from "sequelize";
import { getDbConnection } from "../database";
import { EmployeesFields } from "./Interface";

export function getEmployeesModel() {
    return getDbConnection().define<EmployeesFields>(
        "employees",
        {
            employee_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            business_id: {
                type: DataTypes.INTEGER,
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
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            },
        },
        {
            freezeTableName: true,
            underscored: true,
        }
    );
}
