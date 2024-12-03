import { z } from 'zod';

// UserName Schema (firstName, middleName, lastName)
const studentValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(10, 'First name cannot exceed 10 characters')
    .regex(/^[A-Z]/, 'First name must start with an uppercase letter'),

  middleName: z.string().min(1, 'Middle name is required'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^[A-Za-z]+$/, '{VALUE} name is not valid'), // Only alphabets allowed
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  contactNo: z.string().min(1, 'Local guardian contact number is required'),
  address: z.string().min(1, 'Local guardian address is required'),
});

// Student Schema
 const createStudentValidationSchema = z.object({
   body: z.object({
     password: z
       .string()
       .min(1, 'Password is required')
       .max(20, 'Password cannot exceed 20 characters'),
     student: z.object({
       name: studentValidationSchema,
       dateOfBirth: z.string().optional(),
       email: z
         .string()
         .email(' is not valid email')
         .min(1, 'Email is required')
         .trim(),
       gender: z.enum(['male', 'female'], {
         errorMap: () => ({ message: 'Gender is required' }),
       }),
       contactNo: z.string().min(1, 'Contact number is required').trim(),
       emergencyContactNo: z
         .string()
         .min(1, 'Emergency contact number is required')
         .trim(),
       bloodGroup: z
         .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
         .optional(),
       guardian: guardianValidationSchema,
       localGuardian: localGuardianValidationSchema,
       profileImg: z.string().optional(),
       admissionSemester:z.string(),
     }),
   }),
 });

export const studentValidations = {
  createStudentValidationSchema,
};
