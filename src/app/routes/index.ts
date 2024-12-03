import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { studentRoute } from '../modules/students/student.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
