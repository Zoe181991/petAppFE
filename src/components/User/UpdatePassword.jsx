import React from 'react'
import { FormControl, Box, Stack, Text, Input, Button, FormErrorMessage, Flex, IconButton, ButtonGroup } from '@chakra-ui/react'
import { CheckIcon, EditIcon, CloseIcon, } from '@chakra-ui/icons'
import { useEditableControls } from '@chakra-ui/react'
import { UsersContextInstance } from '../../contex/UsersContext';
import { AuthContextInstance } from '../../contex/AuthContext';
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'


function UpdatePassword() {

    const { isLoading, setIsLoading, loggedInUser, setLoggedInUser, errorMsgClient, setErrorMsgClient, fetchInfo } = useContext(UsersContextInstance);
    const { loggedInUserID } = useContext(AuthContextInstance);
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const toast = useToast()


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
        setIsLoading(true)

        try {
            const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/update/password/${loggedInUser._id}`, updatedPasswords, { withCredentials: true });
            setLoggedInUser(res.data)
            console.log(res.data)
            setIsLoading(false)
            setRePassword("")
            setPassword("")
            toast({
                position: 'bottom',
                status: 'success',
                duration: 3000,
                render: () => (
                    <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
                        The password was updated successfully ✅
                    </Box>
                ),
                isClosable: true,
            })

        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }

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
            <Stack minW='10em' spacing={4} width={['100%', '80%', '60%', '50%']} align='center' >


                <Text className='main-header' mb={3} textColor='red.800'
                    fontSize={['3xl', '4xl', '4xl', '5xl']}>  Update Password</Text>


                <FormControl isInvalid={!passwordsMatch}>
                    {/* <p className='user-edit-field'>Enter a new Password:</p> */}
                    <Text
                        fontSize={{ base: 'md', sm: 'md', md: 'xl', lg: 'xl' }}
                        fontWeight='medium'
                        className='user-edit-field main-font'>
                        Enter a new Password:                </Text>


                    <Input type='password'
                        variant='filled' value={password} onChange={(e) => setPassword(e.target.value)} />



                    <Text
                        fontSize={{ base: 'md', sm: 'md', md: 'xl', lg: 'xl' }}
                        fontWeight='medium'
                        className='user-edit-field main-font'>
                        Retype your Password:             </Text>
                    <Input mb={6} minW='10em' type='password' variant='filled' value={repassword} onChange={handleConfirmPasswordChange} />
                    <FormErrorMessage>Passwords doesn't match!</FormErrorMessage>
                </FormControl>


                {/* <Button 
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
              Update password</Button> */}


                <Button
                    className='font-weird' isDisabled={!passwordsMatch}
                    onClick={handlePasswordUpdate} color='white'
                    h='2.6em'
                    width={['15em', '20em', '25em', '30em']}
                    p={1}
                    bgColor='red.800'
                    size='lg'
                    borderBlockEndWidth={4}
                    _hover={{
                        bgGradient: 'linear(to-r, gray.200, gray.100)',
                        color: 'black'
                    }}
                    isLoading={isLoading}
                    loadingText='Loading'
                    colorScheme='red'
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