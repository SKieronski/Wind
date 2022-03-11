import React, { useReducer } from 'react';

//This code is a general template for any piece of context we will need
// This app requires AuthContext and RunRouteContext, maybe LocationContext to track a user?
export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state,dispatch] = useReducer(reducer, defaultValue);

        const boundActions ={};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions}}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider}
};