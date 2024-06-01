import { createContext, useState } from "react";  

// the actual value I want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
}); // create a user context object

export const UserProvider = ({children}) => {
const [currentUser, setCurrentUser] = useState(null); 
const value = {currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
}

