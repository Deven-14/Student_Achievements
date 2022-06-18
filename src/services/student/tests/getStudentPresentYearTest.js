import { Student } from "./../../../interfaces/index.js";
import getStudentPresentYear from "./../getStudentPresentYear.js";

async function getStudentPresentYearTest(student) {
    const presentYear = await getStudentPresentYear(student.usn);
    console.log(presentYear);
}

async function main() {

    const student = new Student({
        usn: "1BM19IS048",
        name: "Deven Prakash Paramaj",
        email: "devenparamaj.is19@bmsce.ac.in",
        phone: "1234567890" // imp phone is text
    });
    await getStudentPresentYearTest(student);
}

main();