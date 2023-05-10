import React, { useState, createContext } from "react";


const AppContext = createContext(null);



function AppContextProvider({ children }) {
    const [ user, setUser ] = useState(null);


    // Put exposed states here
    const state = {
        user, 
        setUser,
    };



    return (
        <AppContext.Provider value={ state } >
            {children}
        </AppContext.Provider>
    );
}


export { AppContextProvider }
export default AppContext;