import { model, Schema } from 'mongoose';
import Team from '../../teams/domain/team';

const teamSchema = new Schema<Team>({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  championships: {
    type: Number,
    required: true,
  },
  bestPosition: {
    type: Object,
    required: true,
  },
  poles: {
    type: Number,
    required: true,
  },
  fastestLaps: {
    type: Number,
    required: true,
  },
  chassis: {
    type: String,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  car: {
    type: String,
  },
  driver1: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  },
  driver2: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  },
});

teamSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const TeamModel = model('Team', teamSchema, 'teams');
