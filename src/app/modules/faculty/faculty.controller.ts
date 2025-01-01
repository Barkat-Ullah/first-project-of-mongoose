import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { FacultyServices } from './faculty.service';
import status from 'http-status-codes';

const getSingleFaculty = createAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDb(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is retrieved successfully',
    data: result,
  });
});

const getAllFaculties = createAsync(async (req, res) => {

  const result = await FacultyServices.getAllFacultiesIntoDb(req.query);
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'Faculties are retrieved successfully',
     meta: result.meta,
     data: result.result,
   });
});

const updateFaculty = createAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Faculty is update successfully',
      data: result,
    });
});

const deleteFaculty = createAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Faculty is deleted successfully',
      data: result,
    });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
