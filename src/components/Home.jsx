import React from 'react'
import { Image,  Spinner } from '@chakra-ui/react'
import {  NavLink, useNavigate,  } from 'react-router-dom';
import { UsersContextInstance } from '../contex/UsersContext';
import HomeLoggedIn from './User/HomeLoggedIn';
import { AuthContextInstance } from '../contex/AuthContext';
import { useEffect, useState, useContext } from 'react'
import PrivateRouteUser from './User/PrivateRouteUser';
import fallBackSrc from '../images/dog.jpg'

function Home() {
  const navigate = useNavigate();

  const {  fetchInfo, isLoading, setIsLoading  } = useContext(UsersContextInstance);
  const { loggedInUserID, setLoggedInUserID  } = useContext(AuthContextInstance);
  const [ gifSrc, setGifSrc  ] = useState("")
  const [ gifArray, setGifArray  ] = useState([
   "https://i.gifer.com/WTw.gif",
   "https://media.tenor.com/MINogBSXIpcAAAAC/dog.gif",
   "https://media.tenor.com/L-BFYVDXGKAAAAAd/woah-dog.gif",
   "https://media.tenor.com/Egt2H3v94ZYAAAAd/dog-pool.gif",
   "https://media.tenor.com/zB332adxbhgAAAAd/cute-dog-unexpected.gif",
   "https://media.tenor.com/oqV4uQja1z4AAAAC/puppytalesphotos-puppytales.gif",
   "https://media.tenor.com/3nB5e66NmtIAAAAC/dog-dog-tail-wagging.gif",
   "http://acidographie.tumblr.com/post/49251479682/quand-jfais-s-cher-mes-ongles",
   "https://media3.giphy.com/media/13CoXDiaCcCoyk/200.webp?cid=ecf05e474qt6osyiinhlgepgadj2w2jwers07edbuof7eu8k&ep=v1_gifs_search&rid=200.webp&ct=g",
"https://media4.giphy.com/media/v6aOjy0Qo1fIA/giphy.webp?cid=ecf05e474qt6osyiinhlgepgadj2w2jwers07edbuof7eu8k&ep=v1_gifs_search&rid=giphy.webp&ct=g",
"https://media2.giphy.com/media/MWSRkVoNaC30A/giphy.webp?cid=ecf05e474qt6osyiinhlgepgadj2w2jwers07edbuof7eu8k&ep=v1_gifs_search&rid=giphy.webp&ct=g",
"https://media0.giphy.com/media/mlvseq9yvZhba/giphy.webp?cid=ecf05e474qt6osyiinhlgepgadj2w2jwers07edbuof7eu8k&ep=v1_gifs_search&rid=giphy.webp&ct=g",
"https://media1.giphy.com/media/Nm8ZPAGOwZUQM/200.webp?cid=ecf05e473h0alizhlxgogq0xx8jofq9vvibeobgi98k03ndd&ep=v1_gifs_search&rid=200.webp&ct=g",
"https://media1.giphy.com/media/10dU7AN7xsi1I4/giphy.webp?cid=ecf05e473h0alizhlxgogq0xx8jofq9vvibeobgi98k03ndd&ep=v1_gifs_search&rid=giphy.webp&ct=g",
"https://media0.giphy.com/media/8hXXilmk33wtmAGJNu/giphy.webp?cid=ecf05e47cj91z244iuq7udsubwqr3kqazzzpi1hhieoxuc6m&ep=v1_gifs_search&rid=giphy.webp&ct=g",
"https://media1.giphy.com/media/l3q2AMoPRflHphYM8/200w.webp?cid=ecf05e47ykbovu2dltp3tvc3o4067e1yqnkgu46cafm0iqfq&ep=v1_gifs_search&rid=200w.webp&ct=g",
"https://media2.giphy.com/media/3oKIPsgVPHyPPG5p3a/giphy.gif?cid=ecf05e47evero6m4mm11bn778tow0y7et38dydgq93m90k6t&ep=v1_gifs_search&rid=giphy.gif&ct=g",
])


  const navigateSearch = () => {
    navigate('/search');
  };

  useEffect(()=>{
    setIsLoading(true)
    if(loggedInUserID){
      RandomGIF(gifArray)
    }
    const userId=localStorage.getItem('isLoggedin')
    if(userId){
    setLoggedInUserID(userId)
    fetchInfo(userId)
    } 
    setIsLoading(false)

  },[])

  useEffect(()=>{
    setIsLoading(true)
      RandomGIF(gifArray)
      setIsLoading(false)
  },[loggedInUserID])


  function RandomGIF(array) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomValue = array[randomIndex];
      setGifSrc(randomValue)
  }



  return (
    <>
      {!loggedInUserID ?
        <div className='home-container'>
<div className='inner-box'>
    {isLoading?
        <><Spinner ></Spinner></>
        :

        <NavLink to='/search'>
            <Image className="home-welcome-dog-pic" fallbackSrc={fallBackSrc}
                   borderRadius='full'
                   boxSize='250px'
                   src={gifSrc}
                   mr='16'
                   alt='dog-img'/>
        </NavLink>

    }
</div>

            <div className='inner-box'>
<h1 className='main-header'>  Welcome to
</h1><h1 className='main-header'>  Pawsitive Adoptions
</h1>
                <div className="typewriter sub-header">
                    <h2 onClick={navigateSearch}>Your new best friend is waiting for you...</h2>
                    <div className="container-fluid">
                        <div className="search-button" onClick={navigateSearch}>
                            <h3>S E A R C H <span>❯</span></h3>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        :
        <>
        <PrivateRouteUser>
          <HomeLoggedIn />
          </PrivateRouteUser>
        </>
      }

    </>

  )
}

export default Home