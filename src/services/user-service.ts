import UserModel from "@/database/models/user-model";
import bcrypt from "bcryptjs";
// import mailService from "./mail-service";
import { v4 as uuidv4 } from "uuid";
import ApiError from "@/exceptions/apiError";
import roleModel, { IRole } from "@/database/models/role-model";
import userSettingsService from "./userSettings-service";
import UserDto from "@/interfaces/user-dto";
import DatabaseConnection from "@/database/DatabaseConnetion";

class UserService extends DatabaseConnection {
  async registration(email: string, password: string, uiLanguage?: string) {
    const found = await UserModel.findOne({ email });
    if (found) {
      throw ApiError.badRequest(`User with email ${email} alredy exist`);
    }
    const hashPassword = bcrypt.hashSync(password, process.env.HASHSALT);
    const unactivatedRole = await roleModel.findOne({ value: "UNACTIVATED" });
    const activationLink = uuidv4();
    // mailService.sendActivationMail(
    //   email,
    //   `http://${process.env.HOSTURL}/auth/activate/${activationLink}`
    // );
    const user = await (
      await UserModel.create({
        email,
        password: hashPassword,
        roles: [unactivatedRole?._id],
        activationLink,
        uiLanguage,
      })
    ).populate("roles");

    userSettingsService.update(user.id, { uiLanguage });
    return new UserDto(user);
  }

  async activation(activationLink: string) {
    const user = await UserModel.findOne({ activationLink }).populate<{
      roles: IRole[];
    }>("roles");
    if (!user) {
      throw ApiError.badRequest("Activation link expired, please try again");
    }
    const userRole = (await roleModel.findOne({ value: "USER" }))!;
    user.roles = user.roles.map((role, i) =>
      role.value === "UNACTIVATED" ? userRole : role
    );
    await user.save();
    return new UserDto(user);
  }

  async checkActivate(email: string): Promise<UserDto> {
    const user = await UserModel.findOne({ email }).populate<{
      roles: IRole[];
    }>("roles");
    if (!user) {
      throw ApiError.unauthorizeError();
    }
    if (user.roles?.filter((r) => r.value === "UNACTIVATED").length) {
      throw ApiError.needActivateError();
    }
    return new UserDto(user);
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email }).populate<{
      roles: IRole[];
    }>("roles");
    if (!user) {
      throw ApiError.wrongLoginOrPassword();
    }
    const validPassowd = await bcrypt.compare(password, user.password);
    if (!validPassowd) {
      throw ApiError.wrongLoginOrPassword();
    }
    return new UserDto(user);
  }
}
const userService = new UserService();
export default userService;
