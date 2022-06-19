
export default async function isAdmin(email) {
        
    return email.match(/^\w+\.\w+\d{2}/) ? false : true;

}