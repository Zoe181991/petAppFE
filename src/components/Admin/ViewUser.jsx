import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Skeleton,
  IconButton,
  Stack,
  Avatar,
  Button,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Accordion,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import PetCardAdminView from "./PetCardAdminView";
import MainHeader from "../StyledComponents/MainHeader";
import ButtonStyled from "../StyledComponents/ButtonStyled";

function ViewUser() {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isLoadingChanges, setIsLoadingChanges] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tempSavedList, setTempSavedList] = useState([]);
  const [tempFosteredList, setTempFosteredList] = useState([]);
  const [tempAdoptedList, setTempAdoptedList] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const id = params.userId;
      fetchInfoAdmin(id);
      fetchSavedPets(id);
      fetchAdoptedPets(id);
      fetchFosteredPets(id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchInfoAdmin = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/admin/${id}`,
        { withCredentials: true },
      );
      setUser(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setIsLoadingChanges(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/admin/deleteuser/${user._id}`,
        { withCredentials: true },
      );
      setUser(res.data);
      setIsLoadingChanges(false);
    } catch (err) {
      console.log(err);
      setIsLoadingChanges(false);
    }
  };

  const updateToAdmin = async () => {
    try {
      setIsLoadingChanges(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/admin/updateuserinfo/turnintoadmin/${user._id}`,
        { withCredentials: true },
      );
      setUser(res.data);
      setIsLoadingChanges(false);
    } catch (err) {
      console.log(err);
      setIsLoadingChanges(false);
    }
  };

  const updateToUser = async () => {
    try {
      setIsLoadingChanges(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/admin/updateuserinfo/turnintouser/${user._id}`,
        { withCredentials: true },
      );
      setUser(res.data);
      setIsLoadingChanges(false);
    } catch (err) {
      console.log(err);
      setIsLoadingChanges(false);
    }
  };

  const fetchSavedPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${id}/savedpets`,
          { withCredentials: true },
        );
        setTempSavedList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAdoptedPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${id}/adoptedpets`,
          { withCredentials: true },
        );
        setTempAdoptedList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFosteredPets = async (id) => {
    try {
      if (id) {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/users/${id}/fosteredpets`,
          { withCredentials: true },
        );
        setTempFosteredList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <Stack
        minW="10em"
        spacing={4}
        width={["100%", "100%", "90%"]}
        align="center"
        maxW={600}
      >
        <Skeleton isLoaded={!isLoading}>
          <MainHeader text={`View User ${user?.first_name}`} />
        </Skeleton>

        <Stack
          className="main-font"
          p={6}
          bgColor="gray.100"
          wrap={true}
          width={["100%", "100%", "90%"]}
          borderRadius="md"
        >
          <Stack direction="row" mb={5}>
            <Avatar
              size={["md", "lg", "xl"]}
              mr={[3, 5, 8]}
              name={user?.first_name}
              src={user?.picture}
            />
            <Stack fontSize={["sm", "md", "md"]}>
              <Text>
                <span className="bold">First Name:</span> {user?.first_name}
              </Text>
              <Text>
                <span className="bold">Last Name:</span> {user?.last_name}
              </Text>
              <Text>
                <span className="bold">Role:</span> {user?.role}
              </Text>

              <Text>
                <span className="bold">Email:</span> {user?.email}
              </Text>
              <Text>
                <span className="bold">Phone:</span> {user?.phone_number}
              </Text>
              <Text>
                <span className="bold">Bio:</span> {user?.bio}
              </Text>
              <Text>
                <span className="bold">Member Since:</span> {user?.date_created}
              </Text>
            </Stack>
            <Spacer />

            <Stack>
              <IconButton
                onClick={onOpen}
                colorScheme="red"
                aria-label="Call Segun"
                size={["sm", "md", "md"]}
                icon={<DeleteIcon />}
              />
            </Stack>
          </Stack>

          <Stack mt={6} direction="row" fontWeight="normal" justify="center">
            <ButtonStyled
              text={
                user.role !== "Admin"
                  ? "Turn Into Admin"
                  : "Update role to User"
              }
              action={user.role !== "Admin" ? updateToAdmin : updateToUser}
              isLoading={isLoading}
            />
          </Stack>
        </Stack>

        <Accordion defaultIndex={[0]} allowMultiple w="100%">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text
                    className="main-header"
                    mb={3}
                    textColor="#8c52fd"
                    fontSize={["xl", "xl", "xl", "2xl"]}
                  >
                    {" "}
                    View Saved Pets
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div>
                {tempSavedList.map((pet) => (
                  <PetCardAdminView key={pet._id} pet={pet} />
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text
                    className="main-header"
                    mb={3}
                    textColor="#8c52fd"
                    fontSize={["xl", "xl", "xl", "2xl"]}
                  >
                    {" "}
                    View Fostered Pets
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div>
                {tempFosteredList.map((pet) => (
                  <PetCardAdminView key={pet._id} pet={pet} />
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Text
                    className="main-header"
                    mb={3}
                    textColor="#8c52fd"
                    fontSize={["xl", "xl", "xl", "2xl"]}
                  >
                    {" "}
                    View Adopted Pets
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div>
                {tempAdoptedList.map((pet) => (
                  <PetCardAdminView key={pet._id} pet={pet} />
                ))}
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>

      <Modal fontClass="font" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="main-font">Delete Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="medium" className="main-font">
              Are you sure you want to delete {user?.first_name}{" "}
              {user?.last_name}, Id: {user?._id} ?
            </Text>
            <div className="errorMsg"></div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={deleteUser}
              color="white"
              bgGradient="linear(to-r, orange.500, pink.500)"
              _hover={{
                bgGradient: "linear(to-r, orange.200, pink.200)",
              }}
              isLoading={isLoadingChanges}
              loadingText="Deleting User"
              colorScheme="teal"
              variant="outline"
              spinnerPlacement="start"
            >
              Delete User
            </Button>

            <Button
              colorScheme="gray"
              ml={3}
              onClick={(e) => {
                navigate("/admin");
              }}
            >
              Back to Dashboard
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ViewUser;
