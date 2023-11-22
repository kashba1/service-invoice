import path from "path";
import { readFileSync } from "fs";

const key = readFileSync(path.join(__dirname, "../../../public/server.key"));
const cert = readFileSync(path.join(__dirname, "../../../public/server.crt"));

export default { key, cert };
