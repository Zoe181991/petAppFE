import React from "react";
import { FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UsersContextInstance } from "../../contex/UsersContext";

function LoginForm({ initialRef }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { errorMsgClient, setErrorMsgClient, loginReq, isLoading } =
    useContext(UsersContextInstance);

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsgClient("");
  }, []);

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/");
  };

  const handleLogin = () => {
    console.log(`trying to login with ${loginEmail} and ${loginPassword} `);
    const newLogin = {
      email: loginEmail,
      password: loginPassword,
    };
    loginReq(newLogin);
  };

  return (
    <>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          ref={initialRef}
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </FormControl>

      <div className="errorMsg">{errorMsgClient}</div>

      <Stack mt={6} direction="row" justifyContent="center">
        <Button
          className="font-weird"
          color="white"
          onClick={handleLogin}
          colorScheme="purple"
          bgGradient="linear(to-r, pink.400, purple.500)"
          _hover={{
            bgGradient: "purple.200",
          }}
          mr={3}
          size="lg"
          isLoading={isLoading}
          loadingText="One moment..."
          spinnerPlacement="start"
        >
          Login
        </Button>
        <Button size="lg" className="font-weird" onClick={navigateHome}>
          Cancel
        </Button>
      </Stack>
    </>
  );
}

export default LoginForm;
