import React, { createContext, useEffect, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState({
        email: '',
        password: '',
        fullname: {
            firstname: '',
            lastname: ''
        }
    });

    const storeToken = (token) => {
        return localStorage.setItem('token', token);
    };

    return (
        <div>
            <CaptainDataContext.Provider value={{ captain, setCaptain, storeToken }}>
                {children}
            </CaptainDataContext.Provider>
        </div>
    );
};

export default CaptainContext;