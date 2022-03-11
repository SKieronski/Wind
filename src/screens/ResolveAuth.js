import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext'

//returning null because in this case we don't want to show anything since it will load quickly
const ResolveAuthScreen = () => {
    //call try localsignin from this component so there isn't a weird flash on the signup form
    const {tryLocalSignin} = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, []);
    return null;
}

export default ResolveAuthScreen