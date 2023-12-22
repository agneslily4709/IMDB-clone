import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"
import Signout from "./Components/Signout";
import Profile from "./Components/Profile";
import { AuthDataContext } from "./Context/AuthContext";
import "./Styles/styles.css"
import DisplayMovie from "./Pages/DisplayMovie";
import WatchList from "./Pages/WatchList";

function App() {
  return (
        <>
                <AuthDataContext>
                        <BrowserRouter>
                                <Navbar/>
                                        <Routes>
                                                <Route exact path="/" element={<Home />} />
                                                <Route exact path="/signup" element={<Signup />} />
                                                <Route exact path="/signin" element={<Signin />} />
                                                <Route exact path="/signout" element={<Signout />} />
                                                <Route exact path="/profile" element={<Profile />} />
                                                <Route exact path="/displayMovie/:id" element={<DisplayMovie/>}/>
                                                <Route exact path="/watchList" element={<WatchList/>}/>
                                        </Routes>
                                </BrowserRouter>
                        </AuthDataContext>
        </>
  );
}

export default App;
