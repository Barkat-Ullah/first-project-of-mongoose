import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { EnrolledServices } from './enrolledCourse.service';
import status from 'http-status-codes';

const createEnrolledCourse = createAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' successfully create a enroll course',
    data: result,
  });
});
const updateEnrolledCourse = createAsync(async (req, res) => {
  const facultyId = req.user.userId;

  const result = await EnrolledServices.updateEnrolledCourse(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'upload a course marks',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourse,
};
