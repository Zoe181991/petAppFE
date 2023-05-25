import './App.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Guest/Login';
import Search from './components/SearchPet/Search';
import PetPage from './components/SearchPet/PetPage';

import UserProfile from './components/User/UserProfile';
import UpdatePassword from './components/User/UpdatePassword';
import MyPets from './components/User/MyPets';
import PrivateRouteUser from './components/User/PrivateRouteUser'

import HomeAdmin from './components/Admin/HomeAdmin';
import PrivateRouteAdmin from './components/Admin/PrivateRouteAdmin'
import AddPet from './components/Admin/AddPet';
import EditPet from './components/Admin/EditPet';
import ViewUser from './components/Admin/ViewUser';

import UsersContext from './contex/UsersContext';
import PetsContext from './contex/PetsContext';
import AuthContext from './contex/AuthContext';
import AdminContext from './contex/AdminContext';

import { Routes, Route} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
      <ChakraProvider>
        <AuthContext>
        <PetsContext>            
            <UsersContext>
            <AdminContext>
              <Navbar onOpen={onOpen} />
              <div className='bg'>
              <Routes>
                {/* //Admin */}
                <Route path='/' element={<Home />} />
                <Route path='/admin' element={ <HomeAdmin />}/>  
                <Route path='/admin/addpet' element={ <AddPet />} />
                
                <Route path='/admin/editpet/'> 
                <Route path=':petId' element={<PrivateRouteAdmin><EditPet /></PrivateRouteAdmin>} />
                </Route>

                

                <Route path='/admin/viewuser/'> 
                <Route path=':userId' element={<PrivateRouteAdmin><ViewUser /></PrivateRouteAdmin>} />
                </Route>
            
                {/* //Guest */}
                <Route path='/login' element={<Login onOpen={onOpen} isOpen={isOpen} onClose={onClose} />} />
                <Route path='/search' element={<Search />} />

                {/* Pets */}
                <Route path='/pets'>
                  <Route path=':petId' element={<PetPage />} />
                </Route>

                {/* User */}
                <Route path='/mypets' element={<PrivateRouteUser> <MyPets /></PrivateRouteUser>} />
                <Route path='userprofile/edit' element={<PrivateRouteUser><UserProfile /></PrivateRouteUser>} />
                <Route path='userprofile/updatepassword' element={<PrivateRouteUser><UpdatePassword /></PrivateRouteUser>} />

              </Routes>
              </div>
              </AdminContext>
            </UsersContext>
          </PetsContext>
        </AuthContext>
      </ChakraProvider>

    </>


  );
}

export default App;

// https://pet-app-be.vercel.app
