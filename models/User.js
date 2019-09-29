import mongoose from 'mongoose'

const { String } = mongoose.Schema.Types

const options = {
  timestamps: true,
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin', 'root'],
    },
  },
  options,
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
