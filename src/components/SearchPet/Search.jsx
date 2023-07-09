import React, { useState } from 'react'
import { PetsContextInstance } from '../../contex/PetsContext';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import PetsList from './PetsList';
import { Button, Select, Input, Stack, InputGroup, InputLeftElement, FormControl, FormLabel, Text, Box, Spacer } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { SearchIcon, } from '@chakra-ui/icons'
import { AuthContextInstance } from '../../contex/AuthContext';
import { UsersContextInstance } from '../../contex/UsersContext';
import { Switch, SimpleGrid } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faWeightScale } from '@fortawesome/free-solid-svg-icons'
import ButtonStyled from '../StyledComponents/ButtonStyled'

function Search() {
  const toast = useToast()
  const { setPetsList } = useContext(PetsContextInstance);
  const { loggedInUserID } = useContext(AuthContextInstance);
  const { fetchInfo, errorMsgClient, setErrorMsgClient } = useContext(UsersContextInstance);
  const [numResults, setNumResults] = useState("")
  const [numResultsS, setNumResultsS] = useState("")

  const [loading, setLoading] = useState(false)

  const [advSearch, setAdvSearch] = useState(false)
  const [type, setType] = useState("")
  const [name, setName] = useState("")
  const [height, setHeight] = useState(1)
  const [weight, setWeight] = useState(1)
  const [status, setStatus] = useState("Available")


  useEffect(() => {
    setErrorMsgClient("")
    if (loggedInUserID) {
      fetchInfo(loggedInUserID)

    }
  }, [])

  async function getPetbyType(e) {
    try {
      setLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets/search/${type}`, { withCredentials: true });
      setPetsList(res.data)
      setNumResultsS(res.data.length)
      setLoading(false)


    } catch (err) {
      console.log(err)
      setErrorMsgClient(err)
      setLoading(false)
    }

  }
  async function handleSubmit(e) {
    try {
      setNumResults("")
      setLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search?type=${type}&name=${name}&status=${status}&height=${height}&weight=${weight}`, { withCredentials: true });
      setNumResults(res.data.length)

      if (res.status === 200) {
        setPetsList(res.data)
      }
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      toast({
        title: 'No Matchs for your search.',
        description: "Please try to search again.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false)
    }

  }


  async function clearSearch() {
    setName("")
    setStatus("")
    setType("")
    setHeight(1)
    setWeight(1)
    setNumResults("")
    setNumResultsS("")
    setPetsList([])

  }

  async function clearRecReasults() {
    console.log("hi")
    setNumResults("")
    setNumResultsS("")
  }





  return (
    <div className='main-container'>
      <Text className='main-header' mb={3} textColor='#733e87'
        fontSize={['3xl', '4xl', '4xl', '5xl']}> Search for a pet</Text>


      <Text className='sub-header' mb={3} textColor='#733e87'
        fontSize={['md', 'lg', 'xl', '2xl']}> Your new friend is waiting for you</Text>


      <Stack spacing={4} width={['90%', '80%', '65%', '60%']} >
        <Stack direction='row'>
          <InputGroup className='font'>
            <Select name='type' value={type} onChange={(e) => setType(e.target.value)} variant='filled'>
              <option value=''>Pick a type</option>
              <option value='Dog'>Dog</option>
              <option value='Cat'>Cat</option>
              <option value='Other'>Other</option>
            </Select>
          </InputGroup>
        </Stack>

        <Stack direction='row'>
          <FormControl onChange={(e) => setAdvSearch(!advSearch)} display='flex' alignItems='center'>
            <FormLabel className='font' htmlFor='adv-search' mb='0' >
              Advanced Search?
            </FormLabel>
            <Switch onChange={clearRecReasults} colorScheme='purple' id='adv-search' />
          </FormControl>
          {!advSearch &&
            // <Button className='font-weird' onClick={getPetbyType} color='white' w='10em'
            //   size="lg" bgColor='red.800' borderBlockEndWidth={4} _hover={{
            //     bgGradient: 'linear(to-r, gray.200, gray.100)',
            //     color: 'black'
            //   }}
            //   isLoading={loading}
            //   loadingText='Loading'
            //   colorScheme='teal'
            //   variant='outline'
            //   spinnerPlacement='start'> Search</Button>
         
<ButtonStyled text={"Search"} textIsLoading={"Loading"} action={getPetbyType}/>


          }</Stack>
        {numResultsS &&

          <Stack direction='row'>
            <FormLabel mb='0' className='font' >
              Displaying {numResultsS} results that match your search
            </FormLabel>
            <Spacer />
            <Button w='11em' size='sm' colorScheme='gray' onClick={clearSearch}>Clear search</Button>
          </Stack>

        }




        {advSearch &&
          <>
            <Stack direction='row'>
              <InputGroup className='font'>
                <Select name='status' onChange={(e) => setStatus(e.target.value)} value={status} variant='filled'>
                  <option value=''>Adoption status</option>
                  <option value='Available'>Available</option>
                  <option value='Fostered'>Fostered</option>
                  <option value='Adopted'>Adopted</option>
                </Select>
              </InputGroup>
            </Stack>


            <InputGroup className='font' >
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.600' />}
              />
              <Input name='name' onChange={(e) => setName(e.target.value)} value={name} variant='filled' type='text' placeholder="Search by pet's Name" />
            </InputGroup>



            <SimpleGrid minChildWidth='230px' spacing='40px' justify='center' isInline='true'>

              <InputGroup className='font'>
                <span className="icon-mgR" >
                  <FontAwesomeIcon icon={faRuler} />
                </span>
                <FormLabel>Min. Height (Cm):

                </FormLabel>
                <NumberInput name='height' value={height}
                  onChange={(e) => setHeight(e)} size='sm' maxW={24} min={1} className='font' variant='filled' type='number' >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>


              <InputGroup className='font'>
                <FormLabel>
                  <span className="icon-mgR" >
                    <FontAwesomeIcon icon={faWeightScale} /></span>
                  Min. Weight (Kg): </FormLabel>

                <NumberInput name='weight' value={weight}
                  onChange={(e) => setWeight(e)}
                  colorScheme='purple' maxW={24} allowMouseWheel size='sm' min={1} className='font' variant='filled' type='number' >
                  <NumberInputField />
                  <NumberInputStepper >
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>

            </SimpleGrid>



            {/* <Button className='font-weird' onClick={handleSubmit} color='white' h='2.6em' p={1}

              bgColor='red.800'
              borderBlockEndWidth={4}
              _hover={{
                bgGradient: 'linear(to-r, gray.200, gray.100)',
                color: 'black'
              }}
              isLoading={loading}
              loadingText='Loading'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
              fontSize={['md', 'lg', 'xl']}
            >  Search</Button> */}

<ButtonStyled text={"Search"} textIsLoading={"Loading"} action={handleSubmit}></ButtonStyled>

            {numResults &&

              <Stack direction='row'>
                <FormLabel mb='0' className='font' >
                  Displaying {numResults} results that match your search
                </FormLabel>
                <Spacer />
                <Button w='11em' size='sm' colorScheme='gray' onClick={clearSearch}>Clear search</Button>
              </Stack>

            }

          </>

        }

      </Stack>


      <Stack spacing={4} width={['90%', '80%', '65%', '60%']} >
        <PetsList />
      </Stack>
    </div>

  )
}

export default Search


