import { Schema, model } from 'mongoose';
import { Driver } from '../../drivers/domain/drivers';

const driverSchema = new Schema<Driver>({
  name: {
    type: String,
    required: true,
  },
  image: { type: String, required: true },
  nationality: { type: String, required: true },
  racingNumber: { type: Number, required: true },
  championships: { type: Number, required: true },
  podiums: { type: Number, required: true },
  team: { type: String, required: true },
});

driverSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const DriverModel = model('Driver', driverSchema, 'drivers');
