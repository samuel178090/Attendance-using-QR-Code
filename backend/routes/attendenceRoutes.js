const express = require('express');
const router = express.Router();

const attendenceController=require("../controllers/attendenceController")


router.route('/generate-qr').get(attendenceController.generateQRCode);
router.route('/mark-attendance').post(attendenceController.markAttendance);
router.route('/all-student-attendance').get(attendenceController.getAllStudentAttendance);
router.route('/attendance-report').get(attendenceController.getAttendanceReport);


module.exports = router;
