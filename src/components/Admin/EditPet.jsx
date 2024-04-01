import React from 'react'
import { Input, Stack, Textarea, } from '@chakra-ui/react'
import { useEffect, useState,  } from 'react'
import { useParams, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import { Editable, Text, Skeleton, EditableInput, EditableTextarea,  EditablePreview, Flex, IconButton, ButtonGroup, Spacer } from '@chakra-ui/react'
import { CheckIcon, EditIcon, CloseIcon, } from '@chakra-ui/icons'
import { useEditableControls, } from '@chakra-ui/react'
import { Button, Box, Select, Avatar,  } from '@chakra-ui/react'
import { Checkbox, InputGroup, FormControl } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import MainHeader from "../StyledComponents/MainHeader";
import ToastBox from "../StyledComponents/ToastBox";


function EditPet() {
  const params = useParams()
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [pet, setPet] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingChanges, setIsLoadingChanges] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  const [name, setName] = useState("")
  const [adoptionStatus, setAdoptionStatus] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [color, setColor] = useState("")
  const [bio, setBio] = useState("")
  const [hypoallergnic, setHypoallergnic] = useState(false)
  const [diet, setDiet] = useState("")
  const [dietArray, setDietArray] = useState([])
  const [image, setImage] = useState("")
  const [newPhoto, setNewPhoto] = useState(false)

  useEffect(() => {
    console.log("petsID", params.petId)
    setDeleteConfirm('')
    fetchPet(params.petId);
  }, []);

  useEffect(() => {
    setName(pet.name)
    setBio(pet.bio)
    setColor(pet.color)
    setHypoallergnic(pet.hypoallergnic)
    setAdoptionStatus(pet.adoptionStatus)
    setHeight(pet.height)
    setWeight(pet.weight)
    setDietArray(pet.dietery)
    setImage(pet.picture)
  }, [pet])



  const fetchPet = async (petIdUrl) => {
    try {
      setIsLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets/${petIdUrl}`);
      console.log(res.data);
      setPet(res.data);
      setName(res.data.name)
      setBio(res.data.bio)
      setColor(res.data.color)
      setHypoallergnic(res.data.hypoallergnic)
      setAdoptionStatus(res.data.adoptionStatus)
      setHeight(res.data.height)
      setWeight(res.data.weight)
      setDietArray(res.data.dietery)
      setIsLoading(false)

    } catch (err) {
      console.log(err);
    }
  };

  const deletePet = async () => {
    setIsLoadingChanges(true)
    try {
      const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/admin/deletepet/${pet._id}`, { withCredentials: true });
      console.log(res.data)

      setDeleteConfirm(res.data)
      setPet("")
      setIsLoadingChanges(false)

      toast({
        position: 'bottom',
        status: 'success',
        duration: 3000,
        render: () => (
      <ToastBox text={`The pet {pet.name} was deleted successfully 🗑️`} />

    ),
        isClosable: true,
      })

      navigate('/dashboard')

    } catch (err) {
      console.log(err)
      setIsLoadingChanges(false)

    }
  }

  const handleSubmit = () => {
    console.log(image, "IMAGE FILE")
    const formData = new FormData();
    formData.append('picture', image);
    formData.append('id', pet._id);
    formData.append('adoptionStatus', adoptionStatus);
    formData.append('name', name);
    formData.append('color', color);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('bio', bio);
    formData.append('hypoallergnic', hypoallergnic);
    formData.append('dietery', dietArray);
    updatePet(formData)
  }

  const updatePet = async (formData) => {
    for (const value of formData.values()) {
      console.log(value)
    }

    setIsLoadingChanges(true)
    try {
      console.log(newPhoto)
      if (newPhoto === true) {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/updatepetwithimage/`, formData, { withCredentials: true });
        console.log(res.data)
        setNewPhoto(false)
        setIsLoadingChanges(false)

      } if (newPhoto === false) {
        const updatedPet = { id: pet._id, name, height, weight, hypoallergnic, bio, color, adoptionStatus, dietery: dietArray }
        console.log(updatedPet)
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/admin/updatepetinfo`, updatedPet, { withCredentials: true });
        console.log(res.data)
        setNewPhoto(false)
        setPet(res.data)
        setIsLoadingChanges(false)
      }

      toast({
        position: 'bottom',
        status: 'success',
        duration: 3000,
        render: () => (
          <Box className='font-weird' color='red.800' p={3} bg='gray.200'>
            The pet {pet.name} was updated successfully ✅
          </Box>
        ),
        isClosable: true,
      })
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm' ml={4} >
        <IconButton ml={2} icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton ml={2} icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' mt={1} ml={2} icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }


  return (
    <div className='main-container'>



      <MainHeader text={`Edit the pet ${pet?.name}`} />
      <Stack minW='10em' spacing={4} width={['80%', '70%', '55%', '45%']} align='center'>

        <Stack direction='row' bgColor='gray.300' wrap={true} width={['100%', '100%', '90%']} p={5} borderRadius='md'>
          <Avatar size={['md', 'lg', 'xl']} mr={[3, 5, 8]} name={name} src={pet?.picture} />
          <Stack fontSize={['sm', 'md', 'md']} >
            <Text  ><span className='bold'>Name:</span> {pet?.name}</Text>
            <Text  ><span className='bold'>Type:</span> {pet?.type}</Text>
            <Text  ><span className='bold'>Breed:</span> {pet?.breed}</Text>
          </Stack>
          <Spacer />
          <Stack>
            <IconButton align='right' onClick={onOpen} colorScheme='red' aria-label='Call Segun' size={['sm', 'md', 'md']} icon={<DeleteIcon />} />
          </Stack>
        </Stack>



        <Modal fontClass='font' isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className='main-font' >Delete Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight='medium' className='main-font'>Are you sure you want to delete {pet.name}?</Text>
              <div className='errorMsg'>{deleteConfirm}</div>
              {/* <Text>{deleteConfirm}</Text> */}
            </ModalBody>
            <ModalFooter>

              <Button onClick={deletePet} color='white' bgGradient='linear(to-r, orange.500, pink.500)'
                _hover={{
                  bgGradient: 'linear(to-r, orange.200, pink.200)',
                }} >Delete Pet</Button>

              <Button colorScheme='gray' ml={3} onClick={(e) => { navigate('/admin') }}>
                Back to Dashboard
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>




        <Stack wrap={true} bgColor='gray.100' width={['100%', '100%', '90%']} p={12} gap='2' borderRadius='md' flexWrap='wrap'>
          <Skeleton isLoaded={!isLoading}>
            <Text fontWeight='semibold' >Name:</Text>
            <Editable className='editable-field' defaultValue={name} fontSize={['md', 'lg', 'xl']} isPreviewFocusable={false}>
              <EditablePreview />
              <Input value={name} as={EditableInput} onChange={(e) => setName(e.target.value)} />
              <EditableControls />
            </Editable>
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            <Text fontWeight='semibold' mt={5} >Adoption Status:</Text>
            <Select name='status' onChange={(e) => setAdoptionStatus(e.target.value)} value={adoptionStatus} variant='filled' width={['50%', '70%', '100%']}>
              <option value=''>Adoption status</option>
              <option value='Available'>Available</option>
              <option value='Fostered'>Fostered</option>
              <option value='Adopted'>Adopted</option>
            </Select>
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            <Text fontWeight='semibold' mt={5} >Upload Photo:</Text>
            <input type='file' variant='filled' onChange={(e) => {

              setImage(e.target.files[0])
              setNewPhoto(true)
            }} />
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            <Text fontWeight='semibold' mt={5} >Height (cm):</Text>
            <Editable className='editable-field' defaultValue={height} fontSize={['md', 'lg', 'xl']} isPreviewFocusable={false}>
              <EditablePreview />
              <Input value={height} as={EditableInput} onChange={(e) => setHeight(e.target.value)} />
              <EditableControls />
            </Editable>
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            <Text fontWeight='semibold' mt={5} >Weight (Kg):</Text>
            <Editable className='editable-field' defaultValue={weight} fontSize={['md', 'lg', 'xl']} isPreviewFocusable={false}>
              <EditablePreview />
              <Input value={weight} as={EditableInput} onChange={(e) => setWeight(e.target.value)} />
              <EditableControls />
            </Editable>
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            <FormControl mt={4}>
              <InputGroup className='main-font'>
                <Checkbox isChecked={hypoallergnic} value={hypoallergnic} onChange={(e) => setHypoallergnic(!hypoallergnic)} size='md' colorScheme='purple' >
                  Pet is hypoallergnic
                </Checkbox>
              </InputGroup>
            </FormControl>
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            <Stack direction='column'>
              <Text fontWeight='semibold' mt={5} >Edit bio:</Text>
              <Editable className='editable-field' defaultValue={bio} fontSize={['md', 'lg', 'xl']} isPreviewFocusable={false}>
                <EditableTextarea />
                <Textarea variant='filled' value={bio} as={EditableInput} onChange={(e) => setBio(e.target.value)} />
                <EditableControls />
              </Editable>
            </Stack>
          </Skeleton>

          <Stack className='main-font' direction='row'
                 align='center' justify='center' justifyContent='center' flexWrap='wrap' >
            <Skeleton isLoaded={!isLoading}>
              <Button className='main-font' mt={5} color='white'
                maxW='15em' minW='5em'
                borderBlockEndWidth={4}
                      bgGradient= "linear(to-r, pink.400, purple.500)"
                      _hover={{
                        bgGradient: "linear(to-r, purple.500, purple.500)",
                        color: "white",
                      }}
                size={['md', 'lg']}
                isLoading={isLoadingChanges}
                loadingText='Saving Changes'
                colorScheme='red'
                variant='outline'
                spinnerPlacement='start'
                onClick={handleSubmit}>
                Save changes</Button>
            </Skeleton>
          </Stack>

        </Stack>
      </Stack>

    </div>
  )
}

export default EditPet