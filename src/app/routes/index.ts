import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { studentRoute } from '../modules/students/student.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.router';
import { AdminRoutes } from '../modules/admin/admin.router';
import { CourseRoutes } from '../modules/course/course.router';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.router';
import { offeredCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route';
import { AuthRoutes } from '../modules/Auth/auth.router';
import { EnrolledCourseRouter } from '../modules/enrolledCourse/enrolledCourse.router';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/students',
    routes: studentRoute,
  },
  {
    path: '/academic-semesters',
    routes: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    routes: AcademicFacultyRouter,
  },
  {
    path: '/academic-department',
    routes: AcademicDepartmentRouter,
  },
  {
    path: '/faculty',
    routes: FacultyRoutes,
  },
  {
    path: '/admin',
    routes: AdminRoutes,
  },
  {
    path: '/course',
    routes: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    routes: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    routes: offeredCourseRoutes,
  },
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path:'/enrolled-course',
    routes:EnrolledCourseRouter
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
