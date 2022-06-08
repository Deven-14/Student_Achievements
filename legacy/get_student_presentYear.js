
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

// get_student_presentYear("1BM19IS048");

module.exports = get_student_presentYear;