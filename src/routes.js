import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home';
import Filme from './pages/Flime';

import Header from './components/Header';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header></Header>
        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/filme/:id' element={<Filme></Filme>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;