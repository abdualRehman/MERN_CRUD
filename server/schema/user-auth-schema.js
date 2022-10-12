import mongoose from 'mongoose';

const authSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please add a name'],
    },
    email:{
        type: String,
        required:[true, 'Please add an email'],
        unique:true
    },
    password:{
        type: String,
        required:[true, 'Please add a password'],
    },
},{
    timestamps: true
});



// module.exports = mongoose.model('UserAuth' , authSchema);
// here user is main collection, by default it will add 's' in last and becomes 'users'
const UserAuth = mongoose.model('userAuth', authSchema);

export default UserAuth;

