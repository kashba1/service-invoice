import { getAPMInstance } from "./apm";

export const beforeBulkCreateHook = function (this: any, instances: any[], options: any): void {
    const span = getAPMInstance().startSpan(`sequelize.${this.name}.beforeBulkCreate`);
    if (span) {
        span.setLabel('instance_count', instances.length);
        options.__span = span;
    }
};

export const afterBulkCreateHook = function (this: any, instances: any[], options: any): void {
    const span = options.__span;
    if (span) {
        span.setLabel('affected_row_count', instances.length);
        span.end();
    }
};

export const beforeBulkUpdateHook = function (this: any, options: any): void {
    const { attributes, where } = options;
    const query = { attributes, where };
    const span = getAPMInstance().startSpan(`sequelize.${this.name}.beforeBulkUpdate`);
    if (span) {
        span.setLabel('query', `${this.name}.update(${JSON.stringify(query)})`);
        options.__span = span;
    }
};

export const afterBulkUpdateHook = function (this: any, options: any): void {
    const span = options.__span;
    if (span) {
        span.setLabel('affected_row_count', options.result[0]);
        span.end();
    }
};

export const beforeCreateHook = function (this: any, instance: any, options: any): void {
    const span = getAPMInstance().startSpan(`sequelize.${this.name}.beforeCreate`);
    if (span) {
        span.setLabel('model_instance', JSON.stringify(instance));
        options.__span = span;
    }
};

export const afterCreateHook = function (this: any, instance: any, options: any): void {
    const span = options.__span;
    if (span) {
        span.setLabel('model_instance_id', instance.id);
        span.end();
    }
};

export const beforeUpdateHook = function (this: any, instance: any, options: any): void {
    const span = getAPMInstance().startSpan(`sequelize.${this.name}.beforeUpdate`);
    if (span) {
        span.setLabel('model_instance', JSON.stringify(instance));
        options.__span = span;
    }
};

export const afterUpdateHook = function (this: any, instance: any, options: any): void {
    const span = options.__span;
    if (span) {
        span.setLabel('model_instance_id', instance.id);
        span.end();
    }
};

export const beforeUpsertHook = function (this: any, instance: any, options: any): void {
    const span = getAPMInstance().startSpan(`sequelize.${instance.constructor.name}.beforeUpsert`);
    if (span) {
        span.setLabel('query', `${instance.constructor.name}.upsert(${JSON.stringify(instance.get())})`);
        options.__span = span;
    }
};

export const afterUpsertHook = function (this: any, result: any, options: any) {
    const span = options.__span;
    if (span) {
        span.setLabel('query_result_count', result ? 1 : 0);
        span.end();
    }
};

export const beforeFindHook = function (this: any, options: any): void {
    const { attributes, where, include, limit, offset, order, group, having } = options;
    const query = { attributes, where, include, limit, offset, order, group, having };
    const span = getAPMInstance().startSpan(`sequelize.${this.name}.beforeFind`);
    if (span) {
        span.setLabel('query', `${this.name}.findAll(${JSON.stringify(query)})`);
        options.__span = span;
    }
};

export const afterFindHook = function (this: any, instances: any, options: any): void {
    const span = options.__span;
    if (span) {
        span.setLabel('query_result_count', instances.length);
        span.end();
    }
};

export const beforeCountHook = function (this: any, options: any) {
    const { where } = options;
    const query = { where };
    const span = getAPMInstance().startSpan(`sequelize.${this.name}.beforeCount`);
    if (span) {
        span.setLabel('query', `${this.name}.count(${JSON.stringify(query)})`);
        options.__span = span;
    }
};

export const beforeQueryHook = function (this: any, options: any, query: any) {
    const { sql, bind } = query;
    const queryObj = { sql, bind };
    const span = getAPMInstance().startSpan(`sequelize.${this.name}.query`);
    if (span) {
        span.setLabel('query', JSON.stringify(queryObj));
        options.__span = span;
    }
};

export const afterQueryHook = function (this: any, options: any, query: any) {
    const span = options.__span;
    if (span) {
        span.end();
    }
};