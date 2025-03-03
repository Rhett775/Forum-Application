import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext.jsx'
import api from '../api'
import LogoutButton from '../components/LogoutButton'

const Posts = () => {

    const [posts, setPosts] = useState([])

    const {token} = useAuth()

    const axiosApi = api()

    useEffect(() => {
        axiosApi.get('/posts')
        .then((response) => setPosts(response.data))
        .catch((error) => console.log(error))
    }, [token])

    return (
        posts && 
        <div className="flex flex-col justify-start items-center min-h-screen space-y-10 flex-wrap ml-auto w-full">
            <div className="flex flex-row w-full items-center justify-between mb-10">
                <Link className="bg-blue-500 text-white rounded-3xl p-2 hover:bg-blue-600 font-sans font-semibold w-[10%] text-2xl absolute left-4 cursor-pointer" to="/createPost">Create Post</Link>
                <h1 className="font-bold text-5xl text-white font-sans w-full justify-center text-center">Posts</h1>
                <LogoutButton />
            </div>
            {posts.map((post) => (
                <div key={post.title} className="border-y-[1px] border-white w-[70%] max-w-4xl mb-8 p-6">
                    <p className="font-normal text-white font-sans w-full text-start">{post.author}</p>
                    <h2 className="font-semibold text-xl text-white font-sans w-full text-start">{post.title}</h2>
                    <p className="font-normal text-white font-sans w-full text-start break-words">{post.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Posts