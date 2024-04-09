import mongoose, { ObjectId } from "mongoose";

interface UserBalace extends Document {
    userId: ObjectId;
    balance: number;
    transactions: [{
        time: Date;
        amount: number;
    }]
}
const userBalanceSchema = new mongoose.Schema<UserBalace>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
   },
    transactions: [{
        time: {
            type: Date,
            default: Date.now
        },
        amount: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

export const Expense = mongoose.model<UserBalace>("UserBalance", userBalanceSchema);