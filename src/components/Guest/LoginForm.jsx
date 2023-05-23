import React from 'react'
import {FormControl,FormLabel,} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useNavigate} from 'react-router-dom';
import { useState, useContext } from 'react'
import {UsersContextInstance} from '../../contex/UsersContext';


function LoginForm({initialRef, onClose}) {

    const [loginEmail, setLoginEmail]= useState();
    const [loginPassword, setLoginPassword]= useState();
    const { errorMsgClient, loginReq} = useContext(UsersContextInstance);



    const navigate = useNavigate();


    // useEffect(()=>{
    //     setErrorMsgClient("")
    // },[])
 
    const navigateHome = () => {
        // 👇️ navigate to /
        navigate('/');
      };

    const handleLogin = ()=>{
        console.log(`trying to login with ${loginEmail} and ${loginPassword} `)
        const newLogin={
            email:loginEmail,
            password:loginPassword
        }
        loginReq(newLogin);
    }

   

    
   


    return (
        <>

            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input ref={initialRef} placeholder='Email' value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)} />
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type='password' placeholder='Password' value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)} />
            </FormControl>

            <div className='errorMsg'>{errorMsgClient}</div>

            <Button onClick={handleLogin}colorScheme='purple' mr={3} mt={6}>
                            Login
                        </Button>
                        <Button mt={6} onClick={navigateHome}>Cancel</Button>
        </>
    )
}

export default LoginForm