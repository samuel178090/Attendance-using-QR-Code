const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

exports.isAuthenticatedAdmin = async (req, res, next) => {
    try {
        // Accept token from Authorization header or cookie
        let token = req.cookies.tokenAdmin;
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Please admin login to access the resources' });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decodedData.id);
        next();
    } catch (error) {
        console.error('Error in authentication', error);
        res.status(500).json({ message: 'Error in admin authentication' });
    }
};

exports.isAuthenticatedStudent = async (req, res, next) => {
    try {
        // Accept token from Authorization header or cookie
        let token = req.cookies.tokenStudent;
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Please student login to access the resources' });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.student = await Student.findById(decodedData.id);
        next();
    } catch (error) {
        console.error('Error in authentication', error);
        res.status(500).json({ message: 'Error in student authentication' });
    }
};
