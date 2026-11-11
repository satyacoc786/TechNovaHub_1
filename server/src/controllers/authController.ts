import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/schemas';
import { AuthRequest } from '../middleware/auth';

const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'technova_super_secret_jwt_key_2026_secure';
  return jwt.sign({ id: userId, role }, secret, { expiresIn: '7d' });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, email, password, education, interests, skills, careerGoal } = parseResult.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      return;
    }

    // First user can be made admin if none exists, otherwise normal user
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      education: education || 'Engineering Student',
      interests: interests || ['Web Development', 'Artificial Intelligence'],
      skills: skills || ['JavaScript', 'React'],
      careerGoal: careerGoal || 'Full-Stack Developer',
    });

    const token = generateToken(newUser._id.toString(), newUser.role);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        education: newUser.education,
        interests: newUser.interests,
        skills: newUser.skills,
        careerGoal: newUser.careerGoal,
        avatar: newUser.avatar,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during registration.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { email, password } = parseResult.data;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        education: user.education,
        interests: user.interests,
        skills: user.skills,
        careerGoal: user.careerGoal,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error during login.' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        education: req.user.education,
        interests: req.user.interests,
        skills: req.user.skills,
        careerGoal: req.user.careerGoal,
        avatar: req.user.avatar,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const parseResult = updateProfileSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: 'Invalid profile data',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: parseResult.data },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
