import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'

import { createBrowserRouter ,redirect,RouterProvider, useNavigate} from 'react-router-dom'


const Body = () => {
  

   const appRputer= createBrowserRouter([
    {
        path:'/',
        element:<Login/>
    },
    {
       path:'/browse',
       element:<Browse/>
    }
   ])

  


  return (
    <div>
       <RouterProvider router={appRputer}/>
    </div>
  )
}

export default Body