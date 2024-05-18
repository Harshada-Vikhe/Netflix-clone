import React from 'react'
import { SUPPORTED_LANGUAGE, USER_AVATAR } from '../utils/constant'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useEffect } from 'react';
import { LOGO } from '../utils/constant'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser,removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const user= useSelector((store)=> store.user);

  const showGptSearch= useSelector(store=>store.gpt.showGptSearch)

  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(()=>{
  const unsubscribe= onAuthStateChanged(auth, (user) => {
       if (user) {
         const{ uid ,email,displayName}= user.uid;
         dispatch(addUser({uid:uid,email:email,displayName:displayName}))
         navigate('/browse')
       } else {
         // User is signed out
         dispatch(removeUser());
        navigate('/')
       }
     });
     
     //unsubscribe whe component unmount
    return ()=> unsubscribe();
   },[])

   const handleGptSearch=()=>{
       //toggle gpt search
       dispatch(toggleGptSearchView());
   }

   const handleLanguageChange=(e)=>{
     dispatch(changeLanguage(e.target.value));
   }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between  '>
        <img className='w-44 mx-auto md:mx-0'
        src={LOGO} alt='logo'/>
       {user && <div className='flex p-2 justify-between'>
        {showGptSearch && <select className='p-2 bg-gray-700 text-white m-2 rounded-lg cursor-pointer' onChange={handleLanguageChange}>
          {
            SUPPORTED_LANGUAGE.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
          }
        </select>
       }
       <button className='py-2 px-4 my-2 bg-purple-700 text-white rounded-lg mx-4'
        onClick={handleGptSearch}
       >{showGptSearch ? 'Home Page': "Gpt Search"}</button>
        <img  className=' hidden md:block w-12 h-12 p'
         src={USER_AVATAR} alt='user' />
        <button className='font-bold text-white'
         onClick={handleSignOut}
        >Sign Out</button>
        </div>
      } 
    </div>
  )
}

export default Header