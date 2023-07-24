import { createContext, useState } from "react";

const UserContext = createContext();

const initialUser= {id:1, name: 'José Torres',favoriteMovies:[]}

const UserProvider=({children})=>{
    const [user,setUser]=useState(initialUser)
    const login=()=>{
        setUser(initialUser)
    }
    const logout=()=>{
        setUser(null)
    }

    const peliculafavorita= (movieId)=>{
        const favorito=user.favoriteMovies.includes(movieId)
        const favoriteMovies=favorito
        ? user.favoriteMovies.filter(favMovId => favMovId !== movieId)
        : [...user.favoriteMovies,movieId]
        window.scrollTo(0, 980 );
        setUser({
            ...user,
            favoriteMovies
        })
    }
    const data ={user,login,logout,peliculafavorita}
    return(
        <UserContext.Provider value={data}>
            {children}           
        </UserContext.Provider>
    )
}
export {UserProvider}
export default UserContext