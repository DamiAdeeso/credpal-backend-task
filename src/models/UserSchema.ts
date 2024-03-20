import mongoose, { Document } from "mongoose";

export interface IStaff extends Document {
    name: string;
    staffId: string;
    email: string;
    department: string;
    password: string;
    userName: string;
    managerName: string;
    isVerified: boolean;
}

const staffSchema = new mongoose.Schema<IStaff>({
    name: {
        type: String,
        required: true
    },
    staffId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    }
});

const Staff = mongoose.model<IStaff>("Staff", staffSchema);

export default Staff;
