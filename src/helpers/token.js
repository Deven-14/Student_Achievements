import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

export async function generateAccessTokenForStudent(student) {
    return sign(
        { student },
        process.env.STUDENT_ACCESS_TOKEN_SECRECT,
        { expiresIn: "30d" }
    );
}

export async function generateAccessTokenForAdmin(admin) {
    return sign(
        { admin },
        process.env.ADMIN_ACCESS_TOKEN_SECRECT,
        { expiresIn: "30d" }
    );
}


export async function generateRefreshTokenForStudent(student) {
    return sign(
        { student },
        process.env.STUDENT_REFRESH_TOKEN_SECRECT,
        { expiresIn: "60d" }
    );
}

export async function generateRefreshTokenForAdmin(admin) {
    return sign(
        { admin },
        process.env.ADMIN_REFRESH_TOKEN_SECRECT,
        { expiresIn: "60d" }
    );
}