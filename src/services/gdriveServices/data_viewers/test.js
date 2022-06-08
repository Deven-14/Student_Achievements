import { sheets } from "@googleapis/sheets";
import view_achievements from "./view_achievements.js";

async function view_achievements_test() {
    const batches = [
        {
          departmentCode: 'A',
          fromYear: 2019,
          toYear: 2023,
          folderId: '1Cg9XwQKWCYcgXp2IECbH1g_tkUzbHR-7',
          spreadsheetId: '1Amb85cwTkzIrmCcqNK7uAXGw5G2cG5c2z8w2eVphO4Q',
          certificatesFolderId: '1ABi61YpC8hBnztNDArBpBpfqAvjDnD86',
        },
        {
            departmentCode: 'B',
            fromYear: 2018,
            toYear: 2022,
            folderId: '1_9j2ZZ0sSH22N6Pmu_JI7W0ydeH8hLPk-7',
            spreadsheetId: '1dXuXYGBOVJaB3MoyF3S5QaNZ5V4t9DpPuZnd41ZZJOc',
            certificatesFolderId: '1gAtfBla_RiZf8zrEzxJctJCrwl9t51eD',
        }
    ];

    const departments = [
        {
          name: 'Aaa',
          code: 'A',
          folderId: '1bphiwJfYFDtHTRErVVKbDTwdaFUpWO1j',
        },
        {
            name: 'Bbbb',
            code: 'B',
            folderId: '1YLR_aYfZSyvgzkm1suWHNBh4s0V6d_iN',
        }
    ];

    const res = await view_achievements(sheets, departments, batches, 2018, 2024);
    console.log(res);

}

async function main() {
    await view_achievements_test();
}

main();