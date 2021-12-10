import mongoose from "mongoose";
import type { User } from "../../shared/models/user.model";

import bcrypt from 'bcrypt';

const saltRounds = 10;

const userSchema = new mongoose.Schema<User>({
    username:{type: String, required: true},
    password:{type: String, required: true},
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash

    next();
})

userSchema.virtual('both').get(function(this:any) {
    // console.log("from virtual>>>>>", this);
    return `username: ${this.username} password: ${this.password}`
})

userSchema.post('save', function(doc, next) {
    console.log(this.both)
    console.log(next)
    next();
})

export const UserModel = mongoose.model<User>('user', userSchema);