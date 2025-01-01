import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../error/AppError';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isFacultyExists = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isFacultyExists) {
    throw new AppError(404,'This Faculty is already exists');
  }
  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function(next) {
  const query = this.getQuery();
  const isFacultyExists = await AcademicFaculty.findOne(query);
  if (!isFacultyExists) {
    throw new AppError(404,'This Faculty does not already exists');
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
  
);
