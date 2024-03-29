import React, { createContext, useState } from 'react';

import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import { useParams } from 'react-router-dom';
import MusicPage  from "./pages/MusicPage.jsx"

import './Css/sidebar.css'

import './firebase'
import UserAuthContext from './context/UserAuthContext.jsx';
import SideBar from './sidebar'
import LandingPage from './pages/LandingPage';
import NavBar from './navbar';






export const ThemeContext = createContext(null)

function App() {

const { id } = useParams();



//THEME SWITCH
const [theme, setTheme] = useState(()=> localStorage.getItem('theme') || 'light');;

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
};

  return ( 
<ThemeContext.Provider value={{ theme, toggleTheme}}>
  <div className='app' id={theme}>
  <UserAuthContext>
    <Router>
    <NavBar />
    <SideBar themeSwitch={toggleTheme}/>

    
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/policies/legal/terms" element={<MusicPage />} />
      </Routes>
      
  </Router>
  
  </UserAuthContext>
 </div>
 </ThemeContext.Provider >
  )
}

export default App