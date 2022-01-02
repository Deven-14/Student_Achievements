
async function get_user_department_batch_presentYear(usn) {
    
    var data = {};

    let year = parseInt("20" + usn.slice(3, 5));
    let current_year = new Date().getFullYear();
    data.presentYear = current_year - year + 1;
    
    data.batch = `batch-${year}-${year+4}`;

    data.department = usn.slice(5, 7);

    data.usn = parseInt(usn.slice(7));
    if(data.usn < 1 || data.usn > 999){
        reject("Invalid usn no");
    }

    //console.log(data);
    return data;
}

module.exports = get_user_department_batch_presentYear;