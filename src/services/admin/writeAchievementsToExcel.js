import exceljs from 'exceljs';
const { Workbook } = exceljs;

async function write_achievements_to_sheet(workbook, sheet_name, achievements) {

    const sheet = workbook.addWorksheet(sheet_name);

    var headers =  [
        "USN",
        "Name",
        "Bmsce Mail",
        "Name of Event",
        "Details or Location of Event",
        "Level",
        "Award",
        "CertificateUrl",
        "Year Of Achievement",
        "Department Code",
        "Batch"
    ];

    sheet.addRow(headers);

    sheet.addRows(achievements);
}

async function write_all_achievements_to_sheet1(workbook, achievements_of_academic_years) {
    const all_achievements = [];
    for(let academic_year in achievements_of_academic_years) {
        all_achievements.push(...achievements_of_academic_years[academic_year]);
    }
    
    await write_achievements_to_sheet(workbook, "Sheet1", all_achievements);
}

async function write_achievements_of_academic_years_to_sheets(workbook, achievements_of_academic_years) {
    const promises = [];
    for(let academic_year in achievements_of_academic_years) {
        let promise = write_achievements_to_sheet(workbook, academic_year, achievements_of_academic_years[academic_year]);
        promises.push(promise);
    }
    await Promise.all(promises);
}

// export default async function write_achievements_of_academic_years_to_excel(filepath, achievements_of_academic_years) {
export default async function writeAchievementsToExcel(filepath, achievements_of_academic_years) {

    const workbook = new Workbook();

    const promise1 = write_all_achievements_to_sheet1(workbook, achievements_of_academic_years);
    const promise2 = write_achievements_of_academic_years_to_sheets(workbook, achievements_of_academic_years);

    await Promise.all([promise1, promise2]);

    await workbook.xlsx.writeFile(filepath);
}