import { createBrowserRouter,
  RouterProvider
 } from 'react-router-dom'

import './App.css'
import HomePage from './frontendpages/HomePage'
import ArticlesListpage from './frontendpages/ArticlesListPage'
import ArticlePage,{loader as articleLoader} from './frontendpages/ArticlePage'
import AboutPage from './frontendpages/AboutPage'
import Layout from './Layout'
import NotFoundPage from './frontendpages/NotFoundPage'
import axios from 'axios';

const routes = [{
  path: '/',
  element: <Layout/>,
  errorElement : <NotFoundPage/>,
  children: [{
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/articles',
    element: <ArticlesListpage />
  },
  {
    path: '/articles/:name', 
    element: <ArticlePage />,
    loader : articleLoader
  }]
}]


const router = createBrowserRouter(routes);

function App() {
   return ( 
    <>    
     <RouterProvider router={router}/>
    </>
   
  )
}

export default App
