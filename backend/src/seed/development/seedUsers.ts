import Role, { IRoleModel } from "../../models/Role.js";
import User from "../../models/User.js";
import { faker } from "@faker-js/faker";
import log from "../../log/logger.js";

export default async function seedUsers(count: number): Promise<void> {
    try {
      await log("info", "Seeding users");
      User.collection.drop();
      const roles: IRoleModel[] = await Role.find({});
      if (roles.length !== 0) {
        for (let i = 0; i < count; i++) {
          await User.create({
            name: faker.helpers.unique(faker.internet.userName),
            password: faker.internet.password(),
            email: faker.helpers.unique(faker.internet.email),
            phone: faker.helpers.unique(faker.phone.number),
            address: faker.address.streetAddress(true),
            isActivated: true,
            avatar: faker.image.imageUrl(180, 180),
            roleId: roles[Math.floor(Math.random() * roles.length)],
          });
        }
      }
    } catch (err) {
      await log("error", err);
      throw err;
    }
  }