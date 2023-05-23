import React from 'react'
import { Avatar, Card, CardHeader, Editable, Heading, CardBody, Box, CardFooter, FormControl, EditableInput, EditableTextarea, Input, Button, FormErrorMessage, EditablePreview, Flex, IconButton, ButtonGroup, Spacer } from '@chakra-ui/react'
import { CheckIcon, EditIcon, CloseIcon, } from '@chakra-ui/icons'
import { useEditableControls, } from '@chakra-ui/react'
import { UsersContextInstance } from '../../contex/UsersContext';
import { AuthContextInstance } from '../../contex/AuthContext';
import { Stack, Text, HStack, VStack } from '@chakra-ui/react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';


function UserProfile() {


    const { loggedInUser, setLoggedInUser, errorMsgClient, setErrorMsgClient, fetchInfo } = useContext(UsersContextInstance);
    const { loggedInUserID } = useContext(AuthContextInstance);


    const [firstName, setFirstName] = useState(loggedInUser ? loggedInUser.first_name : "");
    const [lastName, setLastName] = useState(loggedInUser ? loggedInUser.last_name : "");
    const [phone, setPhone] = useState(loggedInUser ? loggedInUser.phone_number : "");
    const [email, setEmail] = useState(loggedInUser ? loggedInUser.email : "");
    const [bio, setBio] = useState(loggedInUser ? loggedInUser?.bio : "");

    const [userImage, setUserImage] = useState();

    useEffect(() => {
        fetchInfo(loggedInUserID)
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
        for (const value of formData.values()) {
            console.log(value)
        }

        if (userImage) {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/update/`, formData, { withCredentials: true });
            console.log(res.data)
            setLoggedInUser(res.data)
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
           <Stack spacing={4} width={['100%', '90%', '70%']} align='center' >

            <Text fontSize={{base: '3xl', sm: '3xl', md: '4xl', lg: '4xl' }}
                bgGradient='linear(to-r, teal.500, purple.500)'
                bgClip='text'
                fontWeight='extrabold'
                mb={6}
            >
                Edit your profile      </Text>


            <Card maxW='md'>
                <CardHeader>
                    <Flex flex='1' gap='2' alignItems='center' flexWrap='wrap'>
                        <Avatar name={firstName} src={loggedInUser.picture} />
                        <Heading size='md'>{firstName} {lastName}</Heading>
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
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >

                    <Button onClick={handleSubmit} color='white' 
                    width={{base: 'sm', sm: 'sm', md: 'md', lg: 'md' }}
                    maxW='15em' minW='10em'
                    bgGradient='linear(to-r, teal.500, purple.500)'
              _hover={{
                bgGradient: 'linear(to-r, teal.200, purple.200)',
              }}
            //   isLoading={loading}
              loadingText='Loading'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
            >
              Save changes</Button>
                </CardFooter>
            </Card>
            </Stack>
        </div>
    )
}

export default UserProfile