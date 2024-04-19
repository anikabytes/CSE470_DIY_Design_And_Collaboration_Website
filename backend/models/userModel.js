import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },

    lname: {
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
    },

    address: {
        type: String,
        default: "",
      },

    dress: {
        type: [String],
        default: []
    },
    userType: {
      type: String,
      required: true,
      default: 'User'
    },
    followers: {
      type: [String],
      default: []
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
async function createAdminUser() {
  const existingAdmin = await User.findOne({ email: "something@gmail.com", userType: "Admin" });
  if (!existingAdmin) {
    await User.create({
      fname: "ARTisTs",
      lname: "admins",
      email: "something@gmail.com",
      password: "1111",
      userType: "Admin"
    });
  }
}
createAdminUser();
export default User;
