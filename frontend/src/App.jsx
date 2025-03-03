import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Posts from './pages/Posts.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import CreatePost from './pages/CreatePost.jsx'
import AuthProvider from './AuthContext.jsx'

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <div>404 Not Found</div>
    },
    {
      path: '/posts',
      element: <Posts />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/createPost',
      element: <CreatePost />
    }
  ]);

  return (
  <div>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </div>
  )
}

export default App
