import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import Logging from "../../library/Logging.js";
import Chat from "../../models/Chat.js";
import User, { IUserModel } from "../../models/User.js";

interface IMessage {
    userId: mongoose.Types.ObjectId,
    text: string
}

export default async function seedChats(chatsCount: number, messagesCount: number) : Promise<void> {
    try {
        Logging.info("Seeding chats");
        Chat.collection.drop();
        for (let i = 0; i < chatsCount; i++) {
            const users : IUserModel[] = await User.find({});
            const messages : IMessage[] = [];
            for (let j = 0; j < messagesCount; j++) {
                messages[0] = {
                    userId: users[Math.floor(Math.random() * users.length)]._id,
                    text: faker.lorem.text()
                }
            }
            await Chat.create({
                messages: messages
            });
        }
    } catch (err) {
        Logging.error(err);
        throw err;
    }
}