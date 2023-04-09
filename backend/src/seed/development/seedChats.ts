import { faker } from "@faker-js/faker";
import Logging from "../../library/Logger.js";
import Chat from "../../models/Chat.js";
import User, { IUserModel } from "../../models/User.js";

export default async function seedChats (chatsCount: number, messagesCount: number): Promise<void> {
    try {
        Logging.info("Seeding chats");
        Chat.collection.drop();
        for (let i = 0; i < chatsCount; i++) {
            const users: IUserModel[] = await User.find({});
            const userId = users[Math.floor(Math.random() * users.length)]._id;
            const chat = await Chat.create({
                userId,
            });
            for (let j = 0; j < messagesCount; j++) {
                chat.messages.push({
                    userId,
                    text: faker.lorem.text()
                });
            }
            await chat.save();
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}