import React, { useContext} from 'react'
import UserContext from '../context/UserContext';


export const Natvar = () => {

    const {user,login ,logout}=useContext(UserContext);


  return (
    <div>
        <nav className="navbar navbar-dark bg-dark mb-4 cabecera">
            <span className="navbar-brand">
                    <h2> { user ? `Hola ${user.name}` : 'Bienvenido' } </h2>
            </span>
            {user?<button class="btn btn-outline-danger"  onClick={logout} type="button">Logout</button> 
            : <button class="btn btn-outline-success" onClick={login} type="button">Login</button>}
        </nav>
        
    </div>
  )
}
