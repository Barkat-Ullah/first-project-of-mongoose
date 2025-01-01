import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';
import status from 'http-status-codes';

const createAcademicDepartmentController = createAsync(async (req, res, ) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Academic department is retrieved successfully',
      data: result,
    });
});

const getAllAcademicDepartmentControllers = createAsync(async (req, res, ) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentIntoDb(req.query);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'All academic department get successfully',
      meta: result.meta,
      data: result.result,
    });
});

const getSingleAcademicDepartmentControllers = createAsync(
  async (req, res, ) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentIntoDb(
        departmentId,
      );
     sendResponse(res, {
       statusCode: status.OK,
       success: true,
       message: 'Get a single academic department',
       data: result,
     });
  },
);

const updateAcademicDepartmentControllers = createAsync(async (req, res, ) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(
      departmentId,
      req.body,
    );
 sendResponse(res, {
   statusCode: status.OK,
   success: true,
   message: 'Update a single academic department',
   data: result,
 });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartmentController,
  getAllAcademicDepartmentControllers,
  getSingleAcademicDepartmentControllers,
  updateAcademicDepartmentControllers,
};
