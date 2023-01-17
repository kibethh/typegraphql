import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entities/User";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String, { name: "helllow" })
  async hello() {
    return "Hello World!";
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    return user;
  }
}
