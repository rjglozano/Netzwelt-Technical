// pages/account/login.js
'use client'
import { useState, FormEvent} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import Image from 'next/image'

const LoginForm = () => {
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    const { login } = useAuth();


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try{
            setIsLoading(true);

            const response = await fetch('/api/account/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: username, password: password})
            })

            const responseData = await response.json();
            console.log("response status"+ response.status)

            
            if (responseData.status === 200) {
                login(username, password);
            }
            if(responseData.status !== 200) {
                setMessage(responseData.error)
            } else{
                router.push('/home/index')
            }

            // console.log(responseData);
        }catch(error){
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);

        };
    }

  return (
    <div className='w-full h-screen flex flex-col sm:flex-row '>
        <div className='w-full h-3/5 sm:h-full bg-gradient-to-b from-indigo-600 sm:bg-gradient-to-r sm:from-indigo-600 flex items-center justify-center text-white flex-col gap-2 sm:w-3/5 p-4 '>
            <h1 className='w-2/3 tracking-wide font-Merriweather font-semibold  text-center text-4xl sm:text-start sm:text-5xl md:text-6xl'>Welcome to the <br/>List of Territories</h1>
            <p className='w-2/3 text-center text-sm sm:text-start sm:text-sm md:text-xl mx-2'>It show a hierarchical tree of regions, cities and barangays in the Philippines from external JSON API.</p>
        </div>
        <div className='w-full h-2/5 flex flex-col items-center justify-center sm:w-2/5 sm:h-full '>
            <h1 className='font-Merriweather mb-4 text-xl sm:text-2xl md:text-3xl'>Sign In </h1>
            <p className='font-Merriweather text-center form-fontSize mx-2'>Sign in with your username and password</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 rounded-lg m-2'>
                {message && <p className='bg-red-100 border-red-300 text-red-300 font-Merriweather py-2 px-4 rounded-lg '>{message}</p>}
                <div className='input-container'>
                    <label className='font-Merriweather form-fontSize '>Username: </label>
                    <input 
                        type="text" 
                        name="username"
                        className='input-border font-Merriweather form-fontSize'
                        placeholder='Enter Username'
                        onChange={(e)=> setUsername(e.target.value)}
                        required
                        
                        />
                </div>
                <div className='input-container'>
                    <label className='font-Merriweather form-fontSize' >Password: </label>
                    <input 
                        type="password" 
                        name="password"
                        className='input-border font-Merriweather form-fontSize'
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                </div>
                <div>
                    <button className='btn-login' type="submit">Login</button>
                </div>
                {/* add loading icon later */}
            </form>
        </div>
        
    </div>

  );
};

export default LoginForm;
