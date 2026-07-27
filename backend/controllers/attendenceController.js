const Attendance = require('../models/Attendence');
const crypto = require('crypto');

let currentQRToken = crypto.randomUUID();
let qrGeneratedAt = Date.now();
const QR_EXPIRY_MS = 10 * 60000; // 10 minutes

const attendenceController = {
    generateQRCode: (req, res) => {
        // Regenerate token if expired
        if (Date.now() - qrGeneratedAt > QR_EXPIRY_MS) {
            currentQRToken = crypto.randomUUID();
            qrGeneratedAt = Date.now();
        }
        return res.status(200).json({ qrCodeData: currentQRToken });
    },

    getAllStudentAttendance: async (req, res) => {
        try {
            const allAttendance = await Attendance.find().populate('student', 'rollNo email');
            return res.status(200).json(allAttendance);
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getAttendanceReport: async (req, res) => {
        try {
            const Student = require('../models/Student');
            const allStudents = await Student.find();
            const allAttendance = await Attendance.find().populate('student', 'rollNo email');

            const presentIds = new Set(allAttendance.map(a => a.student?._id?.toString()));

            const present = allStudents.filter(s => presentIds.has(s._id.toString())).map(s => ({ _id: s._id, rollNo: s.rollNo, email: s.email, status: 'Present' }));
            const absent = allStudents.filter(s => !presentIds.has(s._id.toString())).map(s => ({ _id: s._id, rollNo: s.rollNo, email: s.email, status: 'Absent' }));

            return res.status(200).json({ present, absent, total: allStudents.length });
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    markAttendance: async (req, res) => {
        try {
            const { studentId, token } = req.body;

            if (!token || token !== currentQRToken) {
                return res.status(400).json({ message: 'QR code invalid or expired, please refresh admin QR page' });
            }

            const attendance = new Attendance({ student: studentId });
            await attendance.save();
            return res.status(200).json({ message: 'Attendance marked successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = attendenceController;

