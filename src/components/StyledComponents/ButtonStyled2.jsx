import { Button } from "@chakra-ui/react";

function ButtonStyled2({ text, action, isLoading, textIsLoading, icon, children}) {

  return (
    <>
      <Button
          action={action}
          isLoading={isLoading}
          loadingText={textIsLoading ? textIsLoading : "Loading"}
          pr={4}
          pl={4}
          pt={2}
          pb={2}
          className='font-weird'
          color='white'
          matchWidth="true"
          size="lg" bgColor='#8c52fd' borderBlockEndWidth={4}
          colorScheme="purple"
          spinnerPlacement="start"
      //     _hover={{
      //     bgColor: 'blackAlpha.200',
      //     // color: '#FFF18D'
      // }}
      >
        {text}
      </Button>
    </>
  );
}

export default ButtonStyled2;
