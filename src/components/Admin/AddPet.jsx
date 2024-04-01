import React, { useEffect } from "react";
import {
  Checkbox,
  Textarea,
  Button,
  Select,
  Input,
  Stack,
  InputGroup,
  FormControl,
  FormLabel,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import {
  NumberInput,
  List,
  ListItem,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { AdminContextInstance } from "../../contex/AdminContext";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainHeader from "../StyledComponents/MainHeader";

function AddPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("");
  const [bio, setBio] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [diet, setDiet] = useState("");
  const [dietArray, setDietArray] = useState([]);
  const [image, setImage] = useState("");
  const [checkForm, setCheckForm] = useState(false);
  const toast = useToast();
  const { isLoading, setIsLoading } = useContext(AdminContextInstance);

  useEffect(() => {
    if (name && type && breed && image && weight && height) {
      setCheckForm(true);
    } else {
      setCheckForm(false);
    }
  }, [name, type, breed, image, weight, height]);

  const addItem = () => {
    const newItem = diet;
    setDietArray((prevItems) => [...prevItems, newItem]);
  };

  const removeFromDietList = (item) => {
    const newArray = dietArray.filter((dietItem) => dietItem !== item);
    setDietArray(newArray);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("picture", image);
    formData.append("type", type);
    formData.append("adoptionStatus", adoptionStatus);
    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("color", color);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("bio", bio);
    formData.append("hypoallergenic", hypoallergenic);
    formData.append("dietery", dietArray);
    registerPet(formData);
  };

  const registerPet = async (formData) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/admin/addpet`,
        formData,
        { withCredentials: true },
      );
      if (res.data.status === "201") {
        setIsLoading(false);
        toast({
          position: "bottom",
          status: "success",
          duration: 3000,
          render: () => (
            <Box className="font-weird" color="red.800" p={3} bg="gray.200">
              description: {res.data.name} + " the " + {res.data.type} + " was
              added succsufly!" ✅
            </Box>
          ),
          isClosable: true,
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err.message);
    }
  };

  return (
    <div className="main-container">
      <Stack
        minW="10em"
        spacing={4}
        align="center"
        maxW={500}
        width={["90%", "80%", "65%", "60%"]}
      >
        <MainHeader text={"Add a pet"} />
        <FormControl mt={4} isRequired>
          <FormLabel className="main-font">Type:</FormLabel>
          <InputGroup className="main-font">
            <Select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant="filled"
            >
              <option value="">Pick a type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
            </Select>
          </InputGroup>
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel className="main-font">Name:</FormLabel>
          <Input
            variant="filled"
            className="main-font"
            placeholder="Enter the pet's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel className="main-font">Breed:</FormLabel>
          <InputGroup className="main-font">
            <Input
              variant="filled"
              placeholder="Enter the pet's breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel className="main-font">Adoption Status:</FormLabel>

          <InputGroup className="main-font">
            <Select
              name="status"
              onChange={(e) => setAdoptionStatus(e.target.value)}
              value={adoptionStatus}
              variant="filled"
            >
              <option value="">Adoption status</option>
              <option value="Available">Available</option>
              <option value="Fostered">Fostered</option>
              <option value="Adopted">Adopted</option>
            </Select>
          </InputGroup>
        </FormControl>

        <FormControl isRequired mt={4}>
          <InputGroup className="main-font" alignItems="center">
            <FormLabel className="main-font">Height (Cm):</FormLabel>
            <NumberInput
              name="height"
              value={height}
              onChange={(e) => setHeight(e)}
              allowMouseWheel
              min={1}
              size="md"
              variant="filled"
              type="number"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </FormControl>

        <FormControl isRequired mt={4}>
          <InputGroup className="main-font" alignItems="center">
            <FormLabel>Weight (Kg): </FormLabel>
            <NumberInput
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e)}
              colorScheme="purple"
              allowMouseWheel
              size="md"
              min={1}
              className="main-font"
              variant="filled"
              type="number"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel className="main-font">Color:</FormLabel>
          <InputGroup className="main-font">
            <Input
              variant="filled"
              placeholder="Pet's color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <InputGroup className="main-font">
            <Checkbox
              onChange={(e) => setHypoallergenic(!hypoallergenic)}
              size="md"
              colorScheme="red"
            >
              Pet is hypoallergenic
            </Checkbox>
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel className="main-font">Bio</FormLabel>
          <InputGroup className="main-font">
            <Textarea
              variant="filled"
              placeholder="Enter the pet's bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel className="main-font">
            Enter the pet's dietary restrictions:
          </FormLabel>
          <InputGroup className="main-font">
            <Input
              placeholder="Add one dietary restriction"
              variant="filled"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
            />
            <Button
              className="font-weird"
              ml={2}
              fontWeight="light"
              fontSize={12}
              variant="outline"
              bgColor="#8c52fd"
              color={"white"}
              colorScheme="purple"
              _hover={{
                bgGradient: "linear(to-r, pink.400, purple.500)",
                color: "white",
              }}
              onClick={addItem}
            >
              Add Restriction
            </Button>
          </InputGroup>

          <Text mt={3} colorScheme="red" className="main-font">
            {dietArray && `Dietary Restrictions Submitted:`}
          </Text>
          <List spacing={3}>
            {dietArray.map((item) => (
              <ListItem key={item}>
                <IconButton
                  onClick={(e) => removeFromDietList(item)}
                  w={1}
                  mr={3}
                  boxSize={5}
                  aria-label="Search database"
                  icon={<MinusIcon />}
                  colorScheme="red"
                />
                {item}{" "}
              </ListItem>
            ))}
          </List>
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel className="main-font">Upload an image:</FormLabel>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </FormControl>

        <Tooltip label={!checkForm && "Please fill in the required fields"}>
          <Button
            onClick={handleSubmit}
            className="main-font"
            color="white"
            widthMatch="true"
            size="md"
            pr={4}
            pl={4}
            pt={2}
            pb={2}
            bgGradient="linear(to-r, pink.400, purple.500)"
            _hover={{
              bgGradient: "linear(to-r, purple.500, purple.500)",
              color: "white",
            }}
            isLoading={isLoading}
            loadingText="Saving"
            colorScheme="purple"
            variant="ghost"
            spinnerPlacement="start"
          >
            <FontAwesomeIcon className="icon-mgR" icon={faPaw} />
            Register A New Pet
          </Button>
        </Tooltip>
      </Stack>
    </div>
  );
}

export default AddPet;
