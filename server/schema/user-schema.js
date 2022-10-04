import mongoose from 'mongoose';
import autoIncreament from 'mongoose-auto-increment';

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: String,
});

autoIncreament.initialize(mongoose.connection);

userSchema.plugin(autoIncreament.plugin, 'user');


// here user is main collection, by default it will add 's' in last and becomes 'users'
const User = mongoose.model('user', userSchema);

export default User;