import { MovieModel, UserModel, WatchlistModel} from "../Model/Model.js"
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


export const getAllMovies = async(req,res) => {
        try {
                const allMovies = await MovieModel.find()
                res.status(200).json(allMovies)
        } catch (error) {
                res.status(500).json({ message: "Get Movies Error"});
        }
}

export const getMovieDetails = async (req, res) => {
        try {
          const { id } = req.params;
      
          const movieDetail = await MovieModel.findById(id).populate("producer","name profile").populate("actors","name profile")
          res.status(200).json(movieDetail);
        } catch (error) {
          res.status(500).json({ message: "Get Movie Error", error });
        }
};

export const addToWatchlist = async (req, res) => {
        try {
            const userId = req.rootUserId;
            const { movieId } = req.body;
            const watchlist = await WatchlistModel.findOne({ userId }) // Populate the 'movies' array
    
            if (!watchlist) {
                const newWatchlist = new WatchlistModel({ userId: userId, movies: [{ _id: movieId }] }); // Use '_id' for movie reference
                await newWatchlist.save();
            } else {
                watchlist.movies.push({ _id: movieId }); // Use '_id' for movie reference
                await watchlist.save();
            }
    
            res.status(200).json({ message: 'Movie added to watchlist' });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };
export const getWatchList = async (req,res) => {
        try {
                const userId = req.rootUserId
                const watchList = await WatchlistModel.findOne({ userId: userId }).populate({path: "movies", select: 'name yearOfRelease poster',});
                res.status(200).json(watchList);
        } catch (error) {
                res.status(500).json({ message: 'Internal Server Error',error });
        }
}