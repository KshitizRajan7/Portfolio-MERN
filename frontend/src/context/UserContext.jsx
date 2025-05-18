import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';

export const UserDataContext = createContext();

const UserContext = ({children}) => {
    const [user,setUser] = useState({
        fullName:{
            firstName:"",
            lastName:""
        },
        email:"",
        password:""
    })
    console.log("user in context", user);
  return (
    <div>
      <UserDataContext.Provider value={{user,setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
