import React, { useState, useContext, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { Button, Tooltip, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UsersContextInstance } from "../../contex/UsersContext";
import axios from "axios";
function SignUpForm({ initialRef, onClose }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [checkForm, setCheckForm] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const { setErrorMsgClient, errorMsgClient, loginReq } =
    useContext(UsersContextInstance);

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const handleSubmit = () => {
    const newUser = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: "+972".concat(phone),
      password,
      repassword,
    };
    signUpReq(newUser);
  };

  useEffect(() => {
    if (
      email &&
      firstName &&
      lastName &&
      password.length > 5 &&
      repassword.length > 5 &&
      password === repassword
    ) {
      setCheckForm(true);
    } else {
      setCheckForm(false);
    }
  }, [email, firstName, lastName, password, repassword]);

  function handleConfirmPasswordChange(event) {
    setRePassword(event.target.value);
    setPasswordsMatch(event.target.value === password);
  }

  useEffect(() => {
    setErrorMsgClient("");
  }, []);

  const signUpReq = async (userDetails) => {
    try {
      console.log("Sending user's sign up req to server" + userDetails);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/signup`,
        userDetails,
      );
      console.log(res.data);
      loginReq(userDetails);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          ref={initialRef}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          ref={initialRef}
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4} isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          ref={initialRef}
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Phone Number</FormLabel>
        <InputGroup>
          <InputLeftAddon children="+972" />
          <Input
            type="number"
            placeholder="phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <FormControl mt={4} isRequired isInvalid={!passwordsMatch}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormLabel>Retype Password</FormLabel>
        <Input
          type="password"
          placeholder="Retype Password"
          value={repassword}
          onChange={handleConfirmPasswordChange}
        />
        <FormErrorMessage>Passwords do not match!</FormErrorMessage>
      </FormControl>

      <div className="errorMsg">{errorMsgClient}</div>

      <Stack mt={6} direction="row" justifyContent="center">
        <Tooltip
          label={
            !checkForm &&
            "Please fill in the required fields, make sure the passwords match. min length of password is 6 chars"
          }
        >
          <Button
            isDisabled={!checkForm}
            onClick={handleSubmit}
            className="font-weird"
            color="white"
            colorScheme="purple"
            bgGradient="linear(to-r, pink.400, purple.500)"
            _hover={{
              bgGradient: "purple.200",
            }}
            mr={3}
            size="lg"
          >
            Sign Up
          </Button>
        </Tooltip>

        <Button size="lg" className="font-weird" onClick={navigateHome}>
          Cancel
        </Button>
      </Stack>
    </>
  );
}

export default SignUpForm;
