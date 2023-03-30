const jwt = require("jsonwebtoken");
const Process = require("process");

exports.authenticated = (req,res,next,guard='api') => {
    console.log();

    if (guard === 'api') {
        try {
            const authHeader = req.get('Authorization');
            if (! authHeader) {
                return res.status(401).json({data:{result:'unauthorized user'},message:'error'});
            }
            const token = authHeader.split(" ")[1];
            const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decodedToken);
            if (! decodedToken) {
                return res.status(401).json({data:{result:'unauthorized user'},message:'error'});
            }
            req.userId = decodedToken.user.userId;
            req.token = token;
            next();
        } catch (err) {
            return res.status(401).json({data:{result:'unauthorized user'},message:'error'});
        }
    } else {
        if (req.isAuthenticated()){
            return next();
        } else return res.redirect('/admin/auth/login');
    }
}