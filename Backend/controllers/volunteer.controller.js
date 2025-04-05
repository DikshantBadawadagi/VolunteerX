import { Volunteer } from "../models/volunteer.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerVolunteer = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const existingUser = await Volunteer.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Volunteer.create({
            ...req.body,
            password: hashedPassword
        });

        return res.status(201).json({ success: true, message: "Volunteer registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const loginVolunteer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const volunteer = await Volunteer.findOne({ email });
        if (!volunteer || !(await bcrypt.compare(password, volunteer.password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: volunteer._id, role: "volunteer" }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res
            .cookie('token', token, { httpOnly: true, maxAge: 86400000, sameSite: 'strict' })
            .json({ success: true, message: `Welcome ${volunteer.name}`, volunteer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const logoutVolunteer = (_, res) => {
    return res.cookie('token', '', { maxAge: 0 }).json({ success: true, message: 'Logged out' });
};

export const getVolunteerProfile = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id).populate('posts eventsOngoing eventsCompleted memberOf');
        if (!volunteer) return res.status(404).json({ success: false, message: "Volunteer not found" });

        res.status(200).json({ success: true, volunteer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const editVolunteerProfile = async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.id);
        if (!volunteer) return res.status(404).json({ success: false, message: "Volunteer not found" });

        const profileImage = req.file ? getDataUri(req.file) : null;
        if (profileImage) {
            const upload = await cloudinary.uploader.upload(profileImage);
            volunteer.profileImage = upload.secure_url;
        }

        Object.assign(volunteer, req.body);
        await volunteer.save();

        res.status(200).json({ success: true, message: "Profile updated", volunteer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
