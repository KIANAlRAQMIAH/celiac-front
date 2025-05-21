// AuthContext.js
import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';


export const AuthProvider = ({ children }: any) => {
    const adminlogin = useSelector((state: any) => state.auth.adminLogin);

    if (!localStorage.getItem('admintoken')) {
        return < Navigate to="/" replace={true} />

    } else {
        return children
    }

};
