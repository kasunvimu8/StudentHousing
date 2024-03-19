import { Schema, model, models } from "mongoose";

const TestSchema = new Schema({
    name : String,
})

const Test = models.Test || model('Test', TestSchema);

export default Test;