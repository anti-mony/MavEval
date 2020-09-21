import React, { createContext, useState } from "react";

const ApiContext = createContext();

const ApiProvider = (props) => {
    const [apiPrefix, setApiPrefix] = useState('/api/p')

    const toggle = () => {
        if (apiPrefix === '/api/p') {
            setApiPrefix('/api/c')
        } else {
            setApiPrefix('/api/p')
        }
    }

    return <ApiContext.Provider value={{
        prefix: apiPrefix,
        toggle: toggle
    }}>
        {props.children}
    </ApiContext.Provider>

}

export { ApiContext }
export default ApiProvider