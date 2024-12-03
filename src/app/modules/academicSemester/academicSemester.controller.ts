import { RequestHandler } from 'express';
import createAsync from '../../utils/createAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = createAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});
const getAllAcademicSemesters = createAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb();
  res.status(200).json({
    success: true,
    message: 'Academic Semesters are get successfully',
    data: result,
  });
});

const getSingleAcademicSemester = createAsync(async (req, res, next) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDb(semesterId);
  res.status(200).json({
    success: true,
    message: 'get a single academic semester',
    data: result,
  });
});

const updateAcademicSemester = createAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Update a academic semester',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
