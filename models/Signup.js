const mongoose = require('mongoose');
const Loginschema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}

}, {timestamp: true});
mongoose.model = {}
// module.exports = mongoose.model('Loginuser', Loginschema);
export default mongoose.model("Loginuser",Loginschema);