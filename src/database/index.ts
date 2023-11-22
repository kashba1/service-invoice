import { Sequelize } from "sequelize";
import config from "../config";
import {
  afterBulkCreateHook, afterBulkUpdateHook, afterCreateHook, afterFindHook, afterQueryHook, afterUpdateHook,
  afterUpsertHook, beforeBulkCreateHook, beforeBulkUpdateHook, beforeCountHook, beforeCreateHook, beforeFindHook,
  beforeQueryHook, beforeUpdateHook, beforeUpsertHook
} from "../logger/sequelize.hooks";

let dbConnection: Sequelize;

export const getDbConnection = () => {
  if (!dbConnection) {
    dbConnection = new Sequelize(config.mysql.DB, "", "", {
      dialect: config.mysql.dialect,
      operatorsAliases: 0 as any,
      benchmark: true,
      define: {
        timestamps: false,
        // hooks: {
        //   beforeBulkCreate: beforeBulkCreateHook,
        //   afterBulkCreate: afterBulkCreateHook,
        //   // beforeBulkDestroy(options) {
        //   //   console.log("beforeBulkDestroy");
        //   // },
        //   // afterBulkDestroy(options) {
        //   //   console.log("afterBulkDestroy");
        //   // },
        //   beforeBulkUpdate: beforeBulkUpdateHook,
        //   afterBulkUpdate: afterBulkUpdateHook,
        //   beforeCreate: beforeCreateHook,
        //   afterCreate: afterCreateHook,
        //   // beforeDestroy(instance, options) {
        //   //   console.log("beforeDestroy");
        //   // },
        //   // afterDestroy(instance, options) {
        //   //   console.log("afterDestroy");
        //   // },
        //   beforeUpdate: beforeUpdateHook,
        //   afterUpdate: afterUpdateHook,
        //   // beforeSave(instance, options) {
        //   //   console.log("beforeSave");
        //   // },
        //   // afterSave(instance, options) {
        //   //   console.log("afterSave");
        //   // },
        //   beforeUpsert: beforeUpsertHook,
        //   afterUpsert: afterUpsertHook,
        //   beforeFind: beforeFindHook,
        //   afterFind: afterFindHook,
        //   beforeCount: beforeCountHook,
        //   beforeQuery: beforeQueryHook,
        //   afterQuery: afterQueryHook,
        // }
      },
      port: config.mysql.port,
      // logging: (sql: string, duration?: number) => {
      //   console.log(
      //     `Sequelize operation was just executed in ${duration} ms with sql: ${sql}`
      //   );
      // },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      replication: {
        read: [
          {
            host: config.mysql.slave_host,
            username: config.mysql.slave_user,
            password: config.mysql.slave_password,
          },
        ],
        write: {
          host: config.mysql.master_host,
          username: config.mysql.master_user,
          password: config.mysql.master_password,
        },
      },
      logQueryParameters: true,
    });
  }
  return dbConnection;
};

export const disConnect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (dbConnection) {
        await dbConnection.close();
        const message = "|| 🔥 Connection has been closed successfully. 🔥 ||";
        const len = message.length;
        console.log("~".repeat(len));
        console.log(message);
        console.log("~".repeat(len));
      }
      resolve(true);
    } catch (error) {
      console.error('Unable to close connection to the database:', error);
      reject(false);
    }
  });
};