
async function get_student_presentYear(usn) {
    
    let year = parseInt("20" + usn.slice(3, 5));

    let diff = new Date().getTime() - new Date(year, 7).getTime();
    let presentYear = Math.floor(diff / 31560000000) + 1; // 31560000000 millisec = 12 months

    if(presentYear > 4) { // for people who are there for more than 4 years
        presentYear = 4;
    }

    // console.log(diff, presentYear);
    return presentYear;
}

export default async function get_user_department_batch_presentYear(usn) {
    
    var data = {};

    let year = parseInt("20" + usn.slice(3, 5));
    data.presentYear = await get_student_presentYear(usn);
    
    data.batch = `batch-${year}-${year+4}`;

    data.department = usn.slice(5, 7);

    data.usn = parseInt(usn.slice(7));
    if(data.usn < 1 || data.usn > 999){
        throw new Error("Invalid usn no");
    }

    //console.log(data);
    return data;
}