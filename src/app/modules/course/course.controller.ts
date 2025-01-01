import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { CourseServices } from './course.service';
import status from 'http-status-codes';

const createCourse = createAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDb(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course are created successfully',
    data: result,
  });
});

const getAllCourses = createAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDb(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleCourse = createAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDb(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get a single course successfully',
    data: result,
  });
});

const updateCourse = createAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseFromDb(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'update a single course successfully',
    data: result,
  });
});

const assignFacultiesWithCourse = createAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Assign a faculty ',
    data: result,
  });
});
const getFacultiesWithCourse = createAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'successfully get a faculty course ',
    data: result,
  });
});
const removeFacultiesFromCourse = createAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' Remove a faculty ',
    data: result,
  });
});

const deleteCourse = createAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseIntoDb(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' successfully delete course',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  getFacultiesWithCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
