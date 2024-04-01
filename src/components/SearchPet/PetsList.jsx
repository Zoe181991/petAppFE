import { PetsContextInstance } from "../../contex/PetsContext";
import PetCard from "./PetCard";
import { useContext } from "react";
import { SimpleGrid } from "@chakra-ui/react";

function PetsList() {
  const { petsList } = useContext(PetsContextInstance);

  return (
    <div>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="15px">
        {petsList.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </SimpleGrid>
    </div>
  );
}

export default PetsList;
