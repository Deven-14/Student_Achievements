
export async function tokenValidation(req, res, next) {

    try {

        const { authorization } = req.headers;
        if(!authorization) {
            return res.status(400).json({ error: "Access denied, Authorization header missing." });
        }

        const [authType, token] = authorization.trim().split(' ');
        if (authType !== 'Bearer') {
            return res.status(400).json({ error: "Access denied, Expected a Bearer Token." });
        }

        if (!token) {
            return res.status(400).json({ error: "Access denied, Token missing!" });
        }
        
        req.token = token;
        return next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}