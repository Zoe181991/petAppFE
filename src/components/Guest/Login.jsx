import React, { useEffect, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { UsersContextInstance } from "../../contex/UsersContext";
import NavbarButton from "../StyledComponents/NavbarButton";

function Login({ isOpen, onOpen, onClose }) {
  const navigate = useNavigate();
  const { setErrorMsgClient } = useContext(UsersContextInstance);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const navigateSearch = () => {
    navigate("/search");
  };

  useEffect(() => {
    setErrorMsgClient("");
    onOpen();
  }, []);

  return (
    <div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={navigateSearch}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6} pr={10} pl={10}>
            <Text
              size="xs"
              className="font-weird"
              bgColor="blackAlpha.200"
              p={2}
              borderRadius="5px"
              mb={2}
            >
              ❤️ If you wish to save this pet - please log in :)
            </Text>
            <LoginForm initialRef={initialRef} onClose={onClose}></LoginForm>
          </ModalBody>

          <ModalFooter justifyContent="center" className="main-container">
            <Text fontSize="xs" fontWeight="semibold" mb={1}>
              Not a registered user? Sign up now!
            </Text>
            <NavbarButton to="/signup" text="Sign Up" />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Login;
