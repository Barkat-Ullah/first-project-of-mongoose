/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import createAsync from '../../utils/createAsync';
import { SemesterRegistrationServices } from './semesterRegistration.service';
import sendResponse from '../../middlewares/sendResponse';
import status from 'http-status-codes';
import { SemesterRegistration } from './semesterRegistration.model';
import AppError from '../../error/AppError';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';
import mongoose from 'mongoose';

const createSemesterRegistration = createAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'semester registration is created successfully',
    data: result,
  });
});
const getAllSemesterRegistrations = createAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'semester registration is retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleSemesterRegistration: RequestHandler = createAsync(
  async (req, res) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.getSingleSemesterRegistrationsFromDB(
        id,
      );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'get a single semester successfully',
      data: result,
    });
  },
);
const updateSemesterRegistration = createAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' successfully updated a semester registration',
    data: result,
  });
});
const deleteSemesterRegistration = createAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' successfully delete a semester registration',
    data: result,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
