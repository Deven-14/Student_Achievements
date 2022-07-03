import amqp from "amqplib";

export default async function addAchievementProducer(achievement) {
    try {

        const conn = await amqp.connect(process.env.AMQP_URI);
        const channel = await conn.createChannel();

        const queue = "achievements";
        await channel.assertQueue(queue, { durable: true });

        const message = JSON.stringify({ achievement });
        channel.publish("", queue, Buffer.from(message), { persistent: true });
        console.log("message published:", achievement);

        await channel.close();
        await conn.close();

    } catch(error) {
        console.log(error);
        throw error;
    }
}