import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { AdminServices } from './admin.service';
import status from 'http-status-codes';

const getSingleAdmin = createAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDb(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'create a admin',
    data: result,
  });
});

const getAllAdmin = createAsync(async (req, res) => {
  const result = await AdminServices.getAllAdmin(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get all admin',
    meta: result.meta,
    data: result.result,
  });
});

const updateAdmin = createAsync(async (req, res) => {
  const { id } = req.params;
  const { Admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, Admin);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'get a single admin',
    data: result,
  });
});

const deleteAdmin = createAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'delete a admin',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
