import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
