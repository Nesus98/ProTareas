import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
          //Hashear Password
          const salt = await bcrypt.genSalt(10);
          return  await bcrypt.hash(password, salt);
}