import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-2">
            <h1 className="font-bold text-5xl text-white font-sans mb-10">Home</h1>
            <Link className="font-semibold bg-blue-500 text-white rounded-3xl p-2 hover:bg-blue-600 font-sans w-1/4 text-2xl cursor-pointer" to="/login">Login</Link>
            <Link className="font-semibold bg-blue-500 text-white rounded-3xl p-2 hover:bg-blue-600 font-sans w-1/4 text-2xl cursor-pointer" to="/signup">Signup</Link>
        </div>
    )
}

export default Home