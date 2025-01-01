import { RequestHandler } from 'express';
import createAsync from '../../utils/createAsync';
import { studentService } from './student.service';
import sendResponse from '../../middlewares/sendResponse';
import status from 'http-status-codes';

const getAllStudents: RequestHandler = createAsync(async (req, res) => {
 
  const result = await studentService.getAllStudentsFromDb(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'student is retrieved successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = createAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentService.getSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get a single student is retrieved successfully',
    data: result,
  });
});

const updateSingleStudent: RequestHandler = createAsync(
  async (req, res) => {
    const { studentId } = req.params;
    const { student } = req.body;
  
    const result = await studentService.updateSingleStudentFromDb(
      studentId,
      student,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'update a student successfully',
      data: result,
    });
  },
);

const deleteSingleStudent: RequestHandler = createAsync(
  async (req, res) => {
    const { studentId } = req.params;
    const result = await studentService.deleteSingleStudentFromDb(studentId);
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'delete a student successfully',
     data: result,
   });
  },
);

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
};
