import { Button} from '@chakra-ui/react'
import { UsersContextInstance } from '../../contex/UsersContext';
import {useContext } from 'react';

function ButtonStyled({text, action, textILoading}) {

    // const { isLoading, setIsLoading } = useContext(UsersContextInstance);

  return (
    <>
    <Button className='font-weird' onClick={action} color='white' w='10em'
    size='lg' 
    bgColor='red.800' borderBlockEndWidth={4} _hover={{
      bgGradient: 'linear(to-r, gray.200, gray.100)',
      color: 'black'
    }}
    // isLoading={isLoading}
    loadingText={textILoading? textILoading : "Loading"  }
    colorScheme='red'
    variant='outline'
    spinnerPlacement='start'>{text}</Button>

    </>
  )
}

export default ButtonStyled