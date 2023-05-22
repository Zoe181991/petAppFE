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
import { Switch } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faWeightScale } from '@fortawesome/free-solid-svg-icons'

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
    const fetchPetsList = async () => {
      try {
        const res = await axios.get('http://localhost:8080/pets');
        setPetsList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPetsList();
  }, []);

  useEffect(() => {
    setErrorMsgClient("")
    fetchInfo(loggedInUserID)
  }, [])

  async function getPetbyType(e) {
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:8080/pets/search/${type}`, { withCredentials: true });
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
      const res = await axios.get(`http://localhost:8080/search?type=${type}&name=${name}&status=${status}&height=${height}&weight=${weight}`, { withCredentials: true });
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


  }





  return (
    <div className='main-container'>
      {/* <h2 className='sub-header'>Search for a pet</h2> */}
      <Text
        bgGradient='linear(to-r, teal.500, purple.500)'
        bgClip='text'
        fontSize='4xl'
        fontWeight='extrabold'
        mb={6}
      >
        Search for a pet
      </Text>
      <Stack spacing={4} width='50%' >
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
            <FormLabel htmlFor='email-alerts' mb='0' >
              Advanced Search?
            </FormLabel>
            <Switch colorScheme='purple' id='email-alerts' />
          </FormControl>
          {!advSearch &&
            <Button onClick={getPetbyType} color='white' w='10em' size="md" bgGradient='linear(to-r, teal.500, purple.500)'
              _hover={{
                bgGradient: 'linear(to-r, teal.200, purple.200)',
              }}
              isLoading={loading}
              loadingText='Loading'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
            >
              Search</Button>


          }</Stack>
        {numResultsS &&

          <Stack direction='row'>
            <FormLabel mb='0' className='font' >
              Displaying {numResultsS} results that match your search
            </FormLabel>
            <Spacer />
            <Button size='sm' colorScheme='gray' onClick={clearSearch}>Clear search</Button>
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




            {/* <Input className='font' variant='filled' type='number' placeholder="Height in Cm" /> */}
            <Stack direction='row' wrap='true' justify='center' isInline='true'>

              <InputGroup className='font'>
                <span className="icon-mgR" >

                  <FontAwesomeIcon icon={faRuler} />
                </span>
                <FormLabel>Height (Cm):


                </FormLabel>
                <NumberInput name='height' value={height}
                  onChange={(e) => setHeight(e)} size='sm' maxW={20} min={1} className='font' variant='filled' type='number' >
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
                  Weight (Kg): </FormLabel>
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
            </Stack>



            <Button onClick={handleSubmit} className='font' color='white' bgGradient='linear(to-r, teal.500, purple.500)'
              _hover={{
                bgGradient: 'linear(to-r, teal.200, purple.200)',
              }}>
              Search</Button>

            {numResults &&

              <Stack direction='row'>
                <FormLabel mb='0' className='font' >
                  Displaying {numResults} results that match your search
                </FormLabel>
                <Spacer />
                <Button size='sm' colorScheme='gray' onClick={clearSearch}>Clear search</Button>
              </Stack>

            }

          </>

        }

      </Stack>


      <Stack spacing={4} w="50%" >
        <PetsList/>
      </Stack>
    </div>

  )
}

export default Search


