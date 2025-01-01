import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { AcademicFacultyServices } from './academicFaculty.service';
import status from 'http-status-codes';

const createAcademicFacultyController = createAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'create a academic faculty',
    data: result,
  });
});

const getAllAcademicFacultyControllers = createAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesIntoDb(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get all academic faculty',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicFacultyControllers = createAsync(async (req, res) => {
  const { facultiesId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyIntoDb(facultiesId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get single academic faculty',
    data: result,
  });
});

const updateAcademicFacultyControllers = createAsync(async (req, res) => {
  const { facultiesId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
    facultiesId,
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' update academic faculty',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFacultyController,
  getAllAcademicFacultyControllers,
  getSingleAcademicFacultyControllers,
  updateAcademicFacultyControllers,
};
