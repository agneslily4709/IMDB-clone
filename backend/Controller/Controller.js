import { UserModel} from "../Model/Model.js"
import bcrypt from "bcryptjs"

export const apiCheck = (req,res) => {
        res.send(`Hello from backend`)
}

export const signUpUser = async (req, res) => {
        const { fullName, email,  password, role } = req.body;
        try {
            const emailCheck = await UserModel.findOne({ email: email });
            if (emailCheck) return res.status(409).json({ message: "Email ID already exists" })

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({ fullName:fullName, email: email, password: hashedPassword, role:role});
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(404).json({ message:  "Signup error" });
        }
};

export const signInUser = async (req, res) => {
        const { email, password } = req.body;
        try {
                const user = await UserModel.findOne({ email: email });
                if (!user) return res.status(404).json({ message: "User email does not exist" })
                        
                const passwordValidation = await bcrypt.compare(password,user.password);
                if (!passwordValidation) return res.status(401).json({ message: "Password is incorrect" })
                const token = await user.generateSessionToken();
                res.setHeader("X-Auth-Token", token);
                res.status(200).json(user);
        } 
        catch (error) {
                res.status(500).json({ message: "Signin Error"});
        }
};

export const getUserData = (req, res) =>{
        return res.send(req.rootUser);
}

export const signOutUser = (req, res)=> {
        const token = req.token
        //expire token
        const user = req.user
        res.status(200).send(`userLogout`);
}
