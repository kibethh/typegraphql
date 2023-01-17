import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => String, { name: "helllow" })
  async hello() {
    return "Hello World!";
  }

  @Mutation(() => User)
  async register(
    @Arg("data")
    { email, password, firstName, lastName }: RegisterInput
  ): Promise<User | null> {
    console.log("password", password);
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await user.save();
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
