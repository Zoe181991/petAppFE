import React from 'react'
import {useContext} from 'react'
import { AuthContextInstance } from '../../contex/AuthContext'
import {Navigate,} from 'react-router-dom'

function PrivateRouteUser({children}) {
    const {loggedInUserID} = useContext(AuthContextInstance)
  return (
    <div>{loggedInUserID? children : <Navigate to='/'/>}</div>
  )
}

export default PrivateRouteUser
