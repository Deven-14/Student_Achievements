
function is_lecturer(email) {
        
    return new Promise((resolve, reject) => {

        var isValid = email.match(/^\w+\.\w+\d{2}/);
        if(isValid == null) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

module.exports = is_lecturer;