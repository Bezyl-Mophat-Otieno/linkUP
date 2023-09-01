import { sqlConfig } from "../config/db.js";
import mssql, { Request } from "mssql";

interface dataInput {
  [key: string]: any;
}

class DB {
  static async executeProcedure(procedureName: string, data: dataInput = {}) {
    const request: Request = (await mssql.connect(sqlConfig)).request();

    for (let key in data) {
      request.input(key, data[key]);
    }
    const result = await request.execute(procedureName);

    return result;
  }
}

export default DB;
