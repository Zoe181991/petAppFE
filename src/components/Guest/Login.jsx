import React, { useEffect, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { UsersContextInstance } from "../../contex/UsersContext";

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
            <LoginForm initialRef={initialRef} onClose={onClose}></LoginForm>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Login;
