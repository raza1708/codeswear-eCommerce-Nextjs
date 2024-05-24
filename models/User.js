const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
// const UserSchema = new mongoose.Schema-------------> its also valid syntax
const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}

}, {timestamp: true});
// mongoose.model = {}
// module.exports = mongoose.model('Loginuser', Loginschema);
// export default mongoose.model("User",UserSchema);
module.exports = (mongoose.models.User || mongoose.model("Users", UserSchema));