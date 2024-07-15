import { Schema, model, models } from 'mongoose';

const CharacterSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    age: Number,
    birthday: String,
    gender: String,
    location: String,
    region: String,
    datable: Boolean,
    manners: String,
    social: String,
    optimism: String,
    relations: {
        friends: [String],
        family: [String]
    },
    favorites: {
        food: String,
        gift: String
    },
    portraits: [String],
    sprites: [String]
}, {
    timestamps: true,
});

const Character = models.Character || model('Character', CharacterSchema);

export default Character;
