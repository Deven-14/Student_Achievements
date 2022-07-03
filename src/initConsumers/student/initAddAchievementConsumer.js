import amqp from "amqplib";
import { addStudentAchievement } from "./../../services/student/index.js";

async function process_msg(msg, sheets, achievement_sheets_admin_credentials) {
    const { achievement } = await JSON.parse(msg.content.toString());
    console.log(`Received: "${achievement}"`);
    await addStudentAchievement(sheets, achievement_sheets_admin_credentials, achievement);
}

export default async function initAddAchievementConsumer(sheets, achievement_sheets_admin_credentials) {
    try {

        const conn = await amqp.connect(process.env.AMQP_URI);
        const channel = await conn.createChannel();

        const queue = "achievements";
        await channel.assertQueue(queue, { durable: true });
        await channel.prefetch(1);

        console.log("Starting Consuming");
        await channel.consume(queue, async (msg) => {
            if(msg !== null) {
                await process_msg(msg, sheets, achievement_sheets_admin_credentials);
                channel.ack(msg);
            } else {
                console.log("Consumer cancelled by server");
                channel.nack(msg);
            }
        });
        // not closing because we want it to continously consume msg from the queue

    } catch(error) {
        console.log(error);
        throw error;
    }
}