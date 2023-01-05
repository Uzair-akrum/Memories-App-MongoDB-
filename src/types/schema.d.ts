import { Request, Response } from 'express';
interface ICustomSchemaReq  extends Request{
  schemaInfo?: string;
}

 
export default ICustomSchemaReq;
