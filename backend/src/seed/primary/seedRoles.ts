import Logging from "../../library/Logger.js";
import Role from "../../models/Role.js";

export default async function seedRoles (): Promise<void> {
    try {
        Logging.info("Seeding roles");
        await Role.deleteMany({});
        const roleNames = ["admin", "analytist", "contentManager", "shiper", "support", "customer"];
        for (let i = 0; i < roleNames.length; i++) {
            await Role.create({
                name: roleNames[i]
            })
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}