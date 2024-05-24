const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    email: {type: String, required: true},
    products: [{
            productId: {type: String},
            quatity: {type: Number, default: 1},

        }],
    address:{type: String, require: true},
    amount: {type: Number, required: true},
    status: {type: String, default: 'Pending', required: true},

}, {timestamp: true});
// mongoose.models = {}
// export default mongoose.model("Order", OrderSchema);
export default mongoose.models.order || mongoose.model("Order", OrderSchema);