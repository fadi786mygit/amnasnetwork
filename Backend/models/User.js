const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    fullName: { 
      type: String, 
      required: true,
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,  // This creates an index automatically
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['admin', 'instructor', 'student'],
      default: 'student',
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    },
    profileImage: { 
      type: String, 
      default: '' 
    },
    // 🟢 New field for enrollments
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }
    ],
    // 🟢 Terms agreement tracking
    agreedToTerms: {
      type: Boolean,
      default: false,
      required: true
    },
    termsAgreedAt: {
      type: Date
    }
  },
  { 
    timestamps: true 
  }
);

// Remove these duplicate index definitions - they're already created by 'unique: true'
// userSchema.index({ email: 1 });    // REMOVE THIS LINE


// Keep only non-unique indexes
userSchema.index({ role: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;