import { NGO } from "../models/ngo.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerNGO = async (req, res) => {
    try {
        const { name, email, password, registrationNo } = req.body;

        if (!name || !email || !password || !registrationNo) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const existingNGO = await NGO.findOne({ email });
        if (existingNGO) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await NGO.create({
            ...req.body,
            password: hashedPassword
        });

        return res.status(201).json({ success: true, message: "NGO registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const loginNGO = async (req, res) => {
    try {
        const { email, password } = req.body;

        const ngo = await NGO.findOne({ email });
        if (!ngo || !(await bcrypt.compare(password, ngo.password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: ngo._id, role: "ngo" }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res
            .cookie('token', token, { httpOnly: true, maxAge: 86400000, sameSite: 'strict' })
            .json({ success: true, message: `Welcome ${ngo.name}`, ngo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const logoutNGO = (_, res) => {
    return res.cookie('token', '', { maxAge: 0 }).json({ success: true, message: 'Logged out' });
};

export const getNGOProfile = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.params.id).populate('posts members events.active events.upcoming events.past');
        if (!ngo) return res.status(404).json({ success: false, message: "NGO not found" });

        res.status(200).json({ success: true, ngo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const editNGOProfile = async (req, res) => {
    try {
        const ngo = await NGO.findById(req.id); // from middleware
        if (!ngo) return res.status(404).json({ success: false, message: "NGO not found" });

        const profileImage = req.file ? getDataUri(req.file) : null;
        if (profileImage) {
            const upload = await cloudinary.uploader.upload(profileImage);
            ngo.profileImage = upload.secure_url;
        }

        Object.assign(ngo, req.body);
        await ngo.save();

        res.status(200).json({ success: true, message: "NGO profile updated", ngo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
