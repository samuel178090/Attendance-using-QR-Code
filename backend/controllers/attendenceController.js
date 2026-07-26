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
            const allAttendance = await Attendance.find();
            return res.status(200).json(allAttendance);
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

