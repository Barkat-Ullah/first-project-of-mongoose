import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();
router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getSingleStudent);
router.delete('/:studentId', studentController.deleteSingleStudent);

export const studentRoute = router;
