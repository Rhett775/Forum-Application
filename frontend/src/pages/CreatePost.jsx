import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../AuthContext.jsx'
import api from '../api'
import LogoutButton from '../components/LogoutButton'

const CreatePost = () => {

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const {username} = useAuth()
    const axiosApi = api()

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const response = await axiosApi.post('/posts', {
                title: title,
                content: content,
                author: username
            })

            if (response.status === 201) {
                navigate('/posts')

            } else {
                console.log(response.status)
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex flex-col justify-start items-start min-h-screen space-y-2 flex-wrap ml-auto w-full">
            <div className="flex flex-row w-full items-center justify-between mb-10">
                <h1 className="font-bold text-5xl text-white font-sans w-full justify-center text-center">Create Post</h1>
                <LogoutButton />
            </div>
            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
                <input className="m-2 rounded-md text-black font-semibold text-xl block w-[80%]" type="text" placeholder=" Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <textarea className="m-2 rounded-md text-black text-xl font-semibold min-h-[300px] block w-[80%]" type="text" placeholder=" Text" value={content} onChange={(e) => setContent(e.target.value)} />
                <div className="w-[80%] flex justify-end">
                    <input className="font-semibold bg-blue-500 text-white rounded-3xl p-2 hover:bg-blue-600 font-sans w-[10%] text-2xl mr-0" type="submit" value="Post"></input>
                </div>
            </form>
        </div>
    )
}

export default CreatePost