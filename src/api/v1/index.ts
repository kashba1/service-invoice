import { Express } from "express";
import invoicesRoute from "./invoices.api";
import addOnRoute from "./addOn.api";

const urlSegment = "/invoices/v1";

const registerRoutes = (app: Express, options: any) => {
    addOnRoute(app, options, urlSegment);
    invoicesRoute(app, options, urlSegment);
};

export default registerRoutes;
