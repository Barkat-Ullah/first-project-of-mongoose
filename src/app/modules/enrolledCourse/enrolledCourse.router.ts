import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.Controller';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(EnrolledCourseValidation.enrolledCourseValidationSchema),
  EnrolledCourseControllers.createEnrolledCourse,
);
router.patch(
  '/update-enrolled-course',
  auth(USER_ROLE.faculty,USER_ROLE.admin,USER_ROLE.superAdmin),
  validateRequest(EnrolledCourseValidation.updateCourseValidationSchema),
  EnrolledCourseControllers.updateEnrolledCourse,
);

export const EnrolledCourseRouter = router;
