import mongoose, {Schema, Document} from "mongoose";

export type StatusType = 'подошел' | 'отказ' | 'думает';
export type TotalType = 'Выход на работу' | 'Стажировка' | 'Отказ' | 'Отк-Рук'

export interface ICandidatePack extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    position: string;
    name: string;
    phone: string;
    time: string;
    path: string;
    status: StatusType; // back count
    recommendation: string,
    leaderInterview: boolean,
    date: Date,
    SS: Date | null,
    total: TotalType,
    more_id: mongoose.Types.ObjectId;
    meeting:boolean
    created: Date;
    updated: Date;
    type: string;
    _doc: object; // crutch
}

const CandidatesPack: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'srm_hr_User',
            required: true
        },
        user_name: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        status: {
            type: String
        },
        position: {
            type: String,
            required:true
        },
        meeting: {
            type: Boolean
        },
        more_id: {
            type: Schema.Types.ObjectId,
        },
        recommendation: {
            type: String
        },
        leaderInterview: {
            type: Boolean
        },
        date: {
            type: Date,
            required: true
        },
        SS: {
            type: Date ||  null
        },
        total: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
        },
    }
);

export default mongoose.model<ICandidatePack>("candidates-pack", CandidatesPack);