import React from 'react'
import {useContext, useEffect} from 'react'
import { AuthContextInstance } from '../../contex/AuthContext'
import {Navigate, useNavigate} from 'react-router-dom'


function PrivateRouteAdmin({children}) {

    const {isAdmin} = useContext(AuthContextInstance)

  return (
    <div>{isAdmin? children : <Navigate to='/'/>}</div>
  )
}

export default PrivateRouteAdmin