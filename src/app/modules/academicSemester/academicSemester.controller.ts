
import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { AcademicSemesterServices } from './academicSemester.service';
import status from 'http-status-codes';

const createAcademicSemester = createAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  );
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'create a academic department',
     data: result,
   });
});
const getAllAcademicSemesters = createAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb(req.query);
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'get all academic department',
     meta: result.meta,
     data: result.result,
   });
});

const getSingleAcademicSemester = createAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDb(semesterId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get a academic department',
    data: result,
  });
});

const updateAcademicSemester = createAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'update a academic department',
     data: result,
   });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
