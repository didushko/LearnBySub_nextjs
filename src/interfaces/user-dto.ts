import { Types } from "mongoose";
import { IUser } from "../models/user-model";
import { IRole } from "../models/role-model";

export default class UserDto {
    email: string;
    id: string
    roles: string[];
  
    constructor(user: IUser) {
      this.email = user.email;
      this.id = user._id.toString();
      this.roles = this.extractRoleValues(user.roles)
    };

    private extractRoleValues(roles: Types.ObjectId[] | IRole[]): string[] {
        return roles.reduce((result: string[],role) => {
            if ("value" in role) {
             result.push(role.value);
            }
            return result;
        }, []);
    }
  }