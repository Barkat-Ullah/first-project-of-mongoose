import { Schema, model, connect } from 'mongoose';
export type Student = {
  name: string;
  email: string;
  avatar?: string;
};
