import log from "../../log/logger.js";
import Role, { IRoleModel } from "../../models/Role.js";
import User, { IUserModel } from "../../models/User.js";

export default async function seedAdmin(): Promise<void> {

    const pwd = process.env.SHOP_ADMIN_PASSWORD;
    if (pwd) {
        await log("info", "Seeding admin");
        await User.deleteMany({});
        User.find({}).then((users: IUserModel[]) => {
            if (users.length === 0) {
                log("info", "No users found. Init the admin...");

                Role.findOne({ name: "admin" }).then((role: IRoleModel | null) => {
                    if (role) {
                        User.create({
                            name: process.env.SHOP_ADMIN_NAME || "Admin",
                            password: pwd,
                            email: "admin@mail.com",
                            phone: "",
                            address: "",
                            isActivated: true,
                            roleId: role._id,
                        }).then((user: IUserModel) => {
                            log("info",`User ${user.name} has been created`);
                        }).catch((err: Error) => {
                            log("error",err);
                        });
                    } else {
                        log("error",
                            "Admin role is not found." +
                            "Make sure your database is initialized." +
                            "App layer collections should be initialized by the init-script.js file"
                        );
                    }
                }).catch((err: Error) => {
                    log("error",err);
                });
            } else {
                log("info","Users already exist. Initialization is skipped");
            }
        }).catch((err: Error) => {
            log("error", err);
        });
    } else {
        log("error",
            "You need to specify a password for the admin" +
            "as an environment variable SHOP_ADMIN_PASSWORD. Initialization is skipped"
        );
    }
}