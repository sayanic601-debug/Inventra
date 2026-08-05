const jwt = require("jsonwebtoken");

// ===============================
// Verify JWT Token
// ===============================
const protect = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        console.log("Authorization Header:", authHeader);


        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }


        const token = authHeader.split(" ")[1];

        console.log("Received Token:", token);


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        console.log("Decoded Token:", decoded);


        // Store logged-in user information
        req.user = decoded;


        next();


    } catch (error) {

        console.log("JWT Error:", error.message);


        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });

    }
};



// ===============================
// Role Based Authorization
// ===============================
const authorize = (...roles) => {

    return (req, res, next) => {

        try {

            if (!req.user || !req.user.role) {
                return res.status(401).json({
                    success:false,
                    message:"User information missing",
                });
            }


            const userRole = req.user.role.toLowerCase();


            const allowedRoles = roles.map(role =>
                role.toLowerCase()
            );


            console.log("User Role:", userRole);
            console.log("Allowed Roles:", allowedRoles);



            if (!allowedRoles.includes(userRole)) {

                return res.status(403).json({
                    success:false,
                    message:"Access denied",
                });

            }


            next();


        } catch(error){

            return res.status(500).json({
                success:false,
                message:error.message,
            });

        }

    };

};



module.exports = {
    protect,
    authorize,
};