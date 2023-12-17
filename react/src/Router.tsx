import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Home from './Components/Home';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import Error from './Components/Error';

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default Router;
