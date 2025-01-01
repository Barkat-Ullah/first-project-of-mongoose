
import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';


const router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFacultyController,
);
router.get(
  '/:facultiesId',
AcademicFacultyControllers.getSingleAcademicFacultyControllers,
);
router.patch(
  '/:facultiesId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFacultyControllers,
);
router.get('/', AcademicFacultyControllers.getAllAcademicFacultyControllers);

export const AcademicFacultyRouter = router;
