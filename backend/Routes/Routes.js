import express from "express"
import { apiCheck, signInUser, signUpUser, getUserData, signOutUser, getAllMovies,getMovieDetails,addToWatchlist,getWatchList} from "../Controller/Controller.js"
import {Authenticate} from "../Middleware/Middleware.js"

const router = express.Router()
router.get("/check",apiCheck)
router.post("/signup",signUpUser)
router.post("/signin",signInUser)
router.get("/getUserData",Authenticate, getUserData)
router.get("/signout",Authenticate, signOutUser)

router.get("/getAllMovies",Authenticate,getAllMovies)
router.get("/getMovieDetails/:id",Authenticate,getMovieDetails)
router.post("/addToWatchList",Authenticate,addToWatchlist)
router.get("/getWatchList",Authenticate,getWatchList)
export default router