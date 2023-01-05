import bcrypt from "bcryptjs"

const saltround = 10;

const hashed = (password:string) => {
  return bcrypt.hash(password, saltround);
};
export default hashed;
