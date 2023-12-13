import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Home from './Components/Home';
import Header from './Components/Layout/Header';
import Error from './Components/Error';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/user/:id" element={<User />} /> */}
                {/* <Route path="/user/:id/update" element={<UpdateUser />} /> */}
                {/* <Route path="/board" element={<Board />} /> */}
                {/* <Route path="/board/write" element={<WritePost />} /> */}
                {/* <Route path="/board/:id" element={<Post />} /> */}
                {/* <Route path="/board/:id/update" element={<UpdatePost />} /> */}

                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
