import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { OfferedCourseServices } from './OfferedCourse.service';
import status from 'http-status-codes';

const createOfferedCourse = createAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'create a offered course successfully',
    data: result,
  });
});
const getAllOfferedCourses = createAsync(async (req, res) => {
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(req.body)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'get all offered course  retrieved successfully',
      meta:result.meta,
      data: result.result,
    });
});
const getSingleOfferedCourses = createAsync(async (req, res) => {
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(req.params.id)
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'get a single offered course retrieved successfully',
     data: result,
   });
});
const getMyOfferedCourses = createAsync(async (req, res) => {
  const userId = req.user.userId
    const result = await OfferedCourseServices.getMyOfferedCourseFromDB(userId,req.query)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'get my offered course successfully',
      meta: result.meta,
      data: result.result,
    });
});
const updateOfferedCourse = createAsync(async (req, res) => {
  const {id} = req.params
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(id,req.body)
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'offered course is updated successfully',
     data: result,
   });
});
const deleteOfferedCourse = createAsync(async (req, res) => {
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(req.params.id)
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'offered course is deleted successfully',
     data: result,
   });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourses,
  updateOfferedCourse,
  deleteOfferedCourse,
};
