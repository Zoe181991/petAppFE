import React from 'react'
import { Image, Text } from '@chakra-ui/react'
import {  useNavigate,  } from 'react-router-dom';
import { useContext, useEffect } from 'react'
import { UsersContextInstance } from '../contex/UsersContext';
import HomeLoggedIn from './User/HomeLoggedIn';
import { AuthContextInstance } from '../contex/AuthContext';
import HomeAdmin from './Admin/HomeAdmin';



function Home() {
  const navigate = useNavigate();

  const { loggedInUser, setLoggedInUser, fetchInfo, loginReq  } = useContext(UsersContextInstance);
  const { loggedInUserID, setLoggedInUserID  } = useContext(AuthContextInstance);


  const navigateSearch = () => {
    navigate('/search');
  };

  useEffect(()=>{
    const userId=localStorage.getItem('isLoggedin')
    if(userId){
    setLoggedInUserID(userId)
    loginReq(userId)
    fetchInfo(userId)
    } 
  },[])




  return (
    <>
      {!loggedInUserID ?
        <div className='main-container'>
          <h1 className='main-header' ></h1>
          <Text onClick={navigateSearch}
  bgGradient='linear(to-r, teal.500, purple.500)'
  bgClip='text'
  fontSize='4xl'
  fontWeight='extrabold'
>
  Welcome to Pawsitive Adoptions
</Text>
          <h2 onClick={navigateSearch} className='sub-header'>Your new best friend is waiting for you</h2>
          <Image className="home-welcome-dog-pic"
            onClick={navigateSearch}
            borderRadius='full'
            boxSize='400px'
            src="https://i.pinimg.com/564x/c7/9a/b6/c79ab6c22b034839be610ba578be97a0.jpg"
            alt='dog-img'/>
        </div>

        :
        <>
          <HomeLoggedIn />
        </>
      }

    </>

  )
}

export default Home