

import SearchIcon from '@mui/icons-material/Search';
import React,{useEffect} from "react";
import { useAuth } from "./context/UserAuthContext";
import "./Css/navbar.css"

const NavBar = () => {

const {currentuser} = useAuth();

const [isLogged, setIsLogged] = React.useState(false);

useEffect(() => {
if(currentuser){
   setIsLogged(true)
}else{
   setIsLogged(false)
}
}, [currentuser]);

return (
   <div> 
   {isLogged ? ( 
  
      <header className="header" style={{zIndex:999999}}>
    <nav className="nav container">
       <div className="nav__data">
         
             <img style={{width:300}} src={""} alt="lupody logo" />
    
         
       </div>
         <div className="nav_search">
            <SearchIcon className="search-icon"/>
            <input type="text" placeholder="Search" />
         </div>
   
       <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
      
         

          </ul>
       </div>
       <div className="nav_side">
       </div>
    </nav>
    
 </header>
 
   ):(

      <header className="header" style={{zIndex:999999}}>
      <nav className="nav container">
         <div className="nav__data">
         </div>
           <div className="nav_search">
              <SearchIcon className="search-icon"/>
              <input type="text" placeholder="Search" />
           </div>
     
         <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
        
               <li><a href="/login" className="login-btn">Login</a></li>
               <li><a href="/register" className="try-btn">Register</a></li>
  
            </ul>
         </div>
         <div className="nav_side">
         </div>
      </nav>
    </header>
)}
</div>
    
)
}

export default NavBar