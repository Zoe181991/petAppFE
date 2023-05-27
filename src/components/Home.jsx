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

          <Text className='main-header'  
fontSize='4xl'>  Welcome to Pawsitive Adoptions
</Text>
    
          <h2 onClick={navigateSearch} className='sub-header'>Your new best friend is waiting for you</h2>
          <Image className="home-welcome-dog-pic"
            onClick={navigateSearch}
            borderRadius='full'
            boxSize='400px'
            src="https://i.gifer.com/WTw.gif"
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