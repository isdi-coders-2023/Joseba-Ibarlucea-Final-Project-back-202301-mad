import { Schema, model } from 'mongoose';
import { Ranking } from '../../rankings/domain/ranking';

const rankingSchema = new Schema<Ranking>({
  position: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
});

rankingSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const RankingModel = model('Ranking', rankingSchema, 'rankings');
