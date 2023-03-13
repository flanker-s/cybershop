import Role from "../models/Role.js";
import seedAdmin from "./primary/seedAdmin.js";
import seedColors from "./primary/seedColors.js";
import seedDev from "./development/devSeeder.js";
import seedProd from "./production/prodSeeder.js";
import seedRoles from "./primary/seedRoles.js";
import log from "../log/logger.js";

export default async function seedDB(mode: string): Promise<void> {
  await log("info", `Starting app... [ ${mode} mode ]`);
  
    try {
      const roles = await Role.find({});
      if (roles.length !== 0) {
        await log("info", "The DB already contains data. Seeding process is skipped");
        return;
      }
      await seedRoles();
      await seedAdmin();
      await seedColors();
  
      switch (mode) {
        case "development": {
          await seedDev();
          break;
        }
        case "production": {
          await seedProd();
          await log("info", "DB has been seeded for production");
          break;
        }
      }
    } catch (err) {
      await log("error", err);
    }
  }