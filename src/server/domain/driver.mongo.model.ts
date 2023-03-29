import { Schema, model } from 'mongoose';
import { Driver } from '../../drivers/domain/drivers';

const driverSchema = new Schema<Driver>({
  name: {
    type: String,
  },
  image: { type: String },
  nationality: { type: String },
  racingNumber: { type: Number },
  championships: { type: Number },
  podiums: { type: Number },
  team: { type: String },
});

driverSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const DriverModel = model('Driver', driverSchema, 'drivers');
