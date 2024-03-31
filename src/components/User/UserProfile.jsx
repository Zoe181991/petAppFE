import React from 'react'
import { Avatar, Card, CardHeader, Editable, CardBody, Box, CardFooter,  EditableInput,  Input, Button, EditablePreview, Flex, IconButton, ButtonGroup, } from '@chakra-ui/react'
import { CheckIcon, EditIcon, CloseIcon, } from '@chakra-ui/icons'
import { useEditableControls, } from '@chakra-ui/react'
import { UsersContextInstance } from '../../contex/UsersContext';
import { AuthContextInstance } from '../../contex/AuthContext';
import { Stack, Text } from '@chakra-ui/react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import ButtonStyled from "../StyledComponents/ButtonStyled";


function UserProfile() {

    const { isLoading, setIsLoading, loggedInUser, setLoggedInUser, errorMsgClient, setErrorMsgClient, fetchInfo } = useContext(UsersContextInstance);
    const { loggedInUserID } = useContext(AuthContextInstance);

    const [firstName, setFirstName] = useState(loggedInUser ? loggedInUser.first_name : "");
    const [lastName, setLastName] = useState(loggedInUser ? loggedInUser.last_name : "");
    const [phone, setPhone] = useState(loggedInUser ? loggedInUser.phone_number : "");
    const [email, setEmail] = useState(loggedInUser ? loggedInUser.email : "");
    const [bio, setBio] = useState(loggedInUser ? loggedInUser?.bio : "");

    const [userImage, setUserImage] = useState();
    const toast = useToast()

    useEffect(() => {
        fetchInfo(loggedInUserID)
        console.log(loggedInUser)
    }, [])

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('image', userImage);
        formData.append('id', loggedInUserID);
        formData.append('email', email);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('bio', bio);
        formData.append('phone_number', phone);
        updateUser(formData)

    }


    const updateUser = async (formData) => {
        try {
            setIsLoading(true)
            for (const value of formData.values()) {
                console.log(value)
            }

            if (userImage) {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/update/`, formData, { withCredentials: true });
                console.log(res.data)
                setLoggedInUser(res.data)
                setIsLoading(false)

            } else {
                const updatedUser = {
                    id: loggedInUserID,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                    email,
                    bio
                }
                console.log(updatedUser)
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/updateinfo/`,
                    updatedUser, { withCredentials: true });
                console.log(res.data)
                setLoggedInUser(res.data)
                setIsLoading(false)
            }

            toast({
                position: 'bottom',
                status: 'success',
                duration: 3000,
                render: () => (
                    <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
                        The user {firstName} {lastName} was updated successfully ✅
                    </Box>
                ),
                isClosable: true,
            })
        } catch (err) {
            console.log(err)
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

            <Text className='main-header' mb={3} textColor='#8c52fd'
                fontSize={['xl', '2xl', '3xl', '4xl']}>  Edit your profile</Text>

            <Stack width={['90%', '85%', '80%', '70%']} align='center'>

                <Card maxW='md'>
                    <CardHeader>
                        <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
                            <Avatar mr={5} name={firstName} src={loggedInUser.picture} />
                            <Stack>
                                <Text fontSize='1.5em' className='font-weird'>{firstName} {lastName}</Text>
                                <Text fontSize='1em' className='main-font' >Role: {loggedInUser.role}</Text>
                            </Stack>
                        </Flex>
                    </CardHeader>
                    <CardBody mt={0}>
                        <Text className='user-edit-field'>First name:</Text>
                        <Editable className='editable-field'
                            defaultValue={firstName}
                            fontSize='xl'
                            isPreviewFocusable={false}
                        >
                            <EditablePreview />
                            <Input value={firstName} as={EditableInput} onChange={(e) => setFirstName(e.target.value)} />
                            <EditableControls />
                        </Editable>

                        <Text className='user-edit-field'>Last name:</Text>
                        <Editable className='editable-field'
                            defaultValue={lastName}
                            fontSize='xl'
                            isPreviewFocusable={false}
                        >
                            <EditablePreview />
                            <Input value={lastName} as={EditableInput} onChange={(e) => setLastName(e.target.value)} />
                            <EditableControls />
                        </Editable>

                        <Text className='user-edit-field'>Upload Photo:</Text>

                        <input type='file' variant='filled' onChange={(e) => setUserImage(e.target.files[0])} />


                        <Text className='user-edit-field'>Email:</Text>
                        <Editable className='editable-field'
                            defaultValue={email}
                            fontSize='xl'
                            isPreviewFocusable={false}
                        >
                            <EditablePreview />
                            <Input value={email} as={EditableInput} onChange={(e) => setEmail(e.target.value)} />
                            <EditableControls />
                        </Editable>

                        <Text className='user-edit-field'>Phone Number:</Text>
                        <Editable className='editable-field'
                            defaultValue={phone}
                            fontSize='xl'
                            isPreviewFocusable={false}
                        >
                            <EditablePreview />

                            <Input variant='filled' value={phone} as={EditableInput} onChange={(e) => setPhone(e.target.value)} />
                            <EditableControls />
                        </Editable>

                        <Text className='user-edit-field'>Add a Bio:</Text>
                        <Editable className='editable-field'
                            defaultValue={bio}
                            fontSize='xl'
                            isPreviewFocusable={false}
                        >
                            <EditablePreview />

                            <Input variant='filled' value={bio} as={EditableInput} onChange={(e) => setBio(e.target.value)} />
                            <EditableControls />
                        </Editable>
                    </CardBody>


                    <CardFooter
                        justify='space-between'
                        justifyContent='center'
                        flexWrap='wrap'
                        sx={{
                            '& > button': {
                                minW: '136px',
                            },
                        }}
                    >

                        <ButtonStyled text='Save changes' action={handleSubmit} isLoading={isLoading} />
                    </CardFooter>
                </Card>
            </Stack>
        </div>
    )
}

export default UserProfile