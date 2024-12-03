import { RequestHandler } from "express";
import createAsync from "../../utils/createAsync";
import { studentService } from "./student.service";


const getAllStudents: RequestHandler = createAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentsFromDb();
  res.status(200).json({
    success: true,
    message: 'Student are get successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = createAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentService.getSingleStudentFromDb(studentId);
  res.status(200).json({
    success: true,
    message: 'Get a single student successfully',
    data: result,
  });
});
const deleteSingleStudent: RequestHandler = createAsync(
  async (req, res, next) => {
    const { studentId } = req.params;
    const result = await studentService.deleteSingleStudentFromDb(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  },
);

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
