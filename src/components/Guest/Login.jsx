import React, { useEffect, useContext } from 'react'
import { Modal, ModalOverlay, ModalContent,  ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { useNavigate } from 'react-router-dom';
import { UsersContextInstance } from '../../contex/UsersContext';


function Login({ isOpen, onOpen, onClose }) {
    const navigate = useNavigate();

    const {  setErrorMsgClient, loginReq} = useContext(UsersContextInstance);


    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const navigateHome = () => {
        // 👇️ navigate to /
        navigate('/');
    };

    useEffect(()=>{
        setErrorMsgClient("")
        onOpen()

    },[])



  

   


    return (
        <div>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={navigateHome}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <Tabs variant='soft-rounded'  colorScheme="red">
                            <TabList>
                                <Tab className="font-weird" color='red.800'>Login</Tab>
                                <Tab className="font-weird" color='red.800'>Sign Up</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <LoginForm initialRef={initialRef} onClose={onClose} loginReq={loginReq}>
                                    </LoginForm>

                                </TabPanel>
                                <TabPanel>
                                    <SignUpForm initialRef={initialRef} onClose={onClose} loginReq={loginReq}>
                                    </SignUpForm>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default Login