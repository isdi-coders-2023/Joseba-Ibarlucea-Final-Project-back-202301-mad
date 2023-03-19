import { Schema, model } from 'mongoose';
import { Circuit } from '../../circuits/domain/circuit';

const circuitSchema = new Schema<Circuit>({
  race: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  laps: {
    type: Number,
    required: true,
  },
  lapRecord: {
    type: Object,
    required: true,
  },
});

circuitSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const CircuitModel = model('Circuit', circuitSchema, 'circuits');
