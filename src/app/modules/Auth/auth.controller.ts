import config from '../../config';
import sendResponse from '../../middlewares/sendResponse';
import createAsync from '../../utils/createAsync';
import { AuthServices } from './auth.service';
import status from 'http-status-codes';

const loginUser = createAsync(async (req, res) => {
  const result = await AuthServices.loginUsersIntoDB(req.body);
  const { accessToken, refreshToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'User is logged in successfully!',
      data: {
        accessToken,
        needsPasswordChange,
      },
    });
});
const changePassword = createAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePasswordIntoDB(
    req.user,
    passwordData,
  );
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'Password is updated successfully!',
     data: result,
   });
});

const refreshToken = createAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Refresh token found in successfully!',
      data: result
    });
});
const forgetPassword = createAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPasswordIntoDB(userId);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Reset link is generated successfully!',
      data: result,
    });
});
const resetPassword = createAsync(async (req, res) => {
  const token = req?.headers?.authorization;
  const result = await AuthServices.resetPasswordIntoDB(
    req.body,
    token as string,
  );
   sendResponse(res, {
     statusCode: status.OK,
     success: true,
     message: 'Password reset successfully!',
     data: result,
   });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
