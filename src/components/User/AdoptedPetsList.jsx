import React from "react";
import { PetsContextInstance } from "../../contex/PetsContext";
import SavedPetCard from "./SavedPetCard";
import { useContext } from "react";
import { SimpleGrid, Text, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ButtonStyled from "../StyledComponents/ButtonStyled";

function FosteredPetsList() {
  const { adoptedPetsList } = useContext(PetsContextInstance);
  const navigate = useNavigate();

  return (
    <>
      {adoptedPetsList.length < 1 && (
        <NavLink to="/search">
          <Stack alignContent="center" direction="row" align="center">
            <Text
              className="font-weird"
              mr={5}
              color="blackAlpha.700"
              fontSize={["md", "lg", "xl"]}
            >
              You currently do not own any pets!
            </Text>

            <ButtonStyled
              action={(e) => {
                navigate("/search");
              }}
              text={"Search for a pet 😻"}
            />
          </Stack>
        </NavLink>
      )}

      <SimpleGrid
        minChildWidth={["300px"]}
        maxChildWidth={["base: 180px", "220px", "250px", "300px"]}
        spacing="15px"
      >
        <div>
          {adoptedPetsList.map((pet) => (
            <SavedPetCard key={pet._id} pet={pet} />
          ))}
        </div>
      </SimpleGrid>
    </>
  );
}

export default FosteredPetsList;
