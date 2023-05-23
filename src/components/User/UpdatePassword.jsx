import React from 'react'
import { FormControl, Stack, Text, Input, Button, FormErrorMessage, EditablePreview, Flex, IconButton, ButtonGroup } from '@chakra-ui/react'
import { CheckIcon, EditIcon, CloseIcon, } from '@chakra-ui/icons'
import { useEditableControls } from '@chakra-ui/react'
import { UsersContextInstance } from '../../contex/UsersContext';
import { AuthContextInstance } from '../../contex/AuthContext';

import { useEffect, useState, useContext } from 'react'
import axios from 'axios';


function UpdatePassword() {

    const { loggedInUser, setLoggedInUser, errorMsgClient, setErrorMsgClient, fetchInfo } = useContext(UsersContextInstance);
    const { loggedInUserID } = useContext(AuthContextInstance);

    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    const [passwordsMatch, setPasswordsMatch] = useState(false);



    useEffect(() => {
        fetchInfo(loggedInUserID)
        setErrorMsgClient('')
    }, [])


    function handleConfirmPasswordChange(event) {
        setRePassword(event.target.value);
        setPasswordsMatch(event.target.value === password);
    }

    const handlePasswordUpdate = () => {
        const updatedPassword = {
            password,
            repassword,
        }
        updatePassword(updatedPassword)
    }


    const updatePassword = async (updatedPasswords) => {
        const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/update/password/${loggedInUser._id}`, updatedPasswords,  { withCredentials: true });
        setLoggedInUser(res.data)
        console.log(res.data)
    }


    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm' ml={4} >
                <IconButton ml={2} icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton ml={2} icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center'>
                <IconButton size='sm' mt={1} ml={2} icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
        )

    }

    return (
        <div className='main-container'>
        <Stack minW='10em' spacing={4} width={['100%', '90%', '70%']} align='center' 
        maxW={450}>

               <Text
                    fontSize={{base: '3xl', sm: '3xl', md: '4xl', lg: '4xl' }}
                    bgGradient='linear(to-r, teal.500, purple.500)'
                    bgClip='text'
                    fontWeight='extrabold'
                    mb={6}
                >
                    Update Password
                </Text>
             

                <FormControl isInvalid={!passwordsMatch}>
                    {/* <p className='user-edit-field'>Enter a new Password:</p> */}
                    <Text  
                    fontSize={{base: 'md', sm: 'md', md: 'xl', lg: 'xl' }}
                    fontWeight='medium'
                    className='user-edit-field font'>
                    Enter a new Password:                </Text>


                    <Input type='password' 
                    variant='filled' value={password} onChange={(e) => setPassword(e.target.value)} />

                  

                    <Text 
                    fontSize={{base: 'md', sm: 'md', md: 'xl', lg: 'xl' }}
                    fontWeight='medium'
                    className='user-edit-field font'>
                  Retype your Password:             </Text>
                    <Input minW='10em' type='password' variant='filled' value={repassword} onChange={handleConfirmPasswordChange} />
                    <FormErrorMessage>Passwords doesn't match!</FormErrorMessage>
                </FormControl>


                <Button 
                width={{base: 'xs', md: 'sm', lg: 'md' }}
                onClick={handlePasswordUpdate} isDisabled={!passwordsMatch} mt={10}
                color='white' maxW='15em' minW='10em' bgGradient='linear(to-r, teal.500, purple.500)'
              _hover={{
                bgGradient: 'linear(to-r, teal.200, purple.200)',
              }}
            //   isLoading={loading}
              loadingText='Loading'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
            >
              Update password</Button>
                <div className='errorMsg'>{errorMsgClient}</div>

            </Stack>

        </div>



    )
}

export default UpdatePassword