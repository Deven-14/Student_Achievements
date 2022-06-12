import { sheets } from "@googleapis/sheets";
import get_achievements_of_academic_years_within_range from "./get_achievements_of_academic_years_within_range.js";
import dotenv from "dotenv";
import write_achievements_of_academic_years_to_excel from "./write_achievements_of_academic_years_to_excel.js";

async function get_achievements_of_academic_years_within_range_test() {
    const batches = [
        {
          fromYear: 2019,
          toYear: 2023,
        },
        {
            fromYear: 2018,
            toYear: 2022,
        }
    ];

    const departments = [
        {
          name: 'Information Science and Engineering',
          code: 'IS',
          folderId: '13kFhxCxIRZHS-IKrHswotLfMqeclQV7O',
        },
        {
            name: 'Computer Science and Engineering',
            code: 'CS',
            folderId: '1tzj5l3LBP7WPlMf6Vw9icsJhaXWp11nr',
        }
    ];

    const departmentCodes = ['IS', 'CS'];

    const res = await get_achievements_of_academic_years_within_range(sheets, batches, departmentCodes, 2017, 2024);
    console.log(res);
    return res;
}

async function write_achievements_of_academic_years_to_excel_test(filepath, achievements_of_academic_years) {
    await write_achievements_of_academic_years_to_excel(filepath, achievements_of_academic_years);
}

async function main() {
    dotenv.config({ path: "./../../../../../.env" });
    // dotenv.config();
    const achievements_of_academic_years = await get_achievements_of_academic_years_within_range_test();
    await write_achievements_of_academic_years_to_excel_test(`${Date.now()}.xlsx`, achievements_of_academic_years);
}

main();