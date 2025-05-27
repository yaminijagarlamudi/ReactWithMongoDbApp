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
import LoginPage from './frontendpages/LoginPage'
import CreateAccountPage from './frontendpages/CreateAccountPage'
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
    path: '/articles/:name', // -> /articles/learn-react
    element: <ArticlePage />,
    loader : articleLoader
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path : '/create-account',
    element: <CreateAccountPage/>
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
