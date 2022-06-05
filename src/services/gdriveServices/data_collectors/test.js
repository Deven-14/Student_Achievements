import { sheets } from "@googleapis/sheets"
import { add_user } from "./add_user.js"

async function add_user_test() {
    const user = {
        name: "deven",
        email: "devenparamaj.is19@bmsce.ac.in",
        usn: "1BM19IS048",
        phone: "1234567890"
    }
    await add_user(sheets, user, "1Amb85cwTkzIrmCcqNK7uAXGw5G2cG5c2z8w2eVphO4Q");
}

async function main() {
    await add_user_test();
}

main();