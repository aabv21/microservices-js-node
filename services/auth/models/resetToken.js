import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema(
  {
    eventId: { type: String, unique: true },
    token: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

// create indexes TTL
resetTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);
await ResetToken.syncIndexes();
export default ResetToken;
