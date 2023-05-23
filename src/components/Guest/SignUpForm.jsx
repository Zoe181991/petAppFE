import React, { useState, useContext } from 'react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { Button,  } from '@chakra-ui/react'
import {  useNavigate } from 'react-router-dom';
import { UsersContextInstance } from '../../contex/UsersContext';
import axios from 'axios';


//https://chakra-ui.com/docs/components/form-control
//https://react-hook-form.com/api/useform/watch/

function SignUpForm({ initialRef, onClose}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');

    const {errorMsgClient, loginReq } = useContext(UsersContextInstance);



    const navigateHome = () => {
        // 👇️ navigate to /
        navigate('/');
    };

    const handleSubmit = () => {
        const newUser = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
            password,
            repassword,
        }
        signUpReq(newUser)
    }

    const signUpReq = async (userDetails) => {
        try {
            console.log("Sending user's sign up req to server" + userDetails)
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, userDetails);
            console.log(res.data)
            loginReq(userDetails)
            navigate('/')

        }
        catch (err) {
            // setErrorMsgClient(err.message)
            console.error(err.message);
        }
    }

    return (
        <>
            <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input ref={initialRef} placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>First Name</FormLabel>
                <Input ref={initialRef} placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input ref={initialRef} placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                    <InputLeftAddon children='+972' />
                    <Input type='number' placeholder='phone number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                </InputGroup>
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>Password</FormLabel>
                <Input type='password' placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>Retype Password</FormLabel>
                <Input type='password' placeholder='Retype Password'
                    value={repassword}
                    onChange={(e) => setRePassword(e.target.value)} />
            </FormControl>

            <div className='errorMsg'>{errorMsgClient}</div>


            <Button onClick={handleSubmit} colorScheme='purple' mr={3} mt={6}>
                Sign Up
            </Button>
            <Button mt={6} onClick={navigateHome}>Cancel</Button>
        </>
    )
}

export default SignUpForm