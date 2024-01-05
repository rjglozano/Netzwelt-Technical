// pages/account/login.js
'use client'
import { useState, FormEvent} from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [message, setMessage] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()

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
    <div className='w-full h-screen flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='bg-green-400 flex flex-col gap-4 p-4 rounded-lg'>
        {message && <p>{message}</p>}
        <div className='flex justify-between gap-2'>
            <label>Username: </label>
            <input 
                type="text" 
                name="username"
                placeholder='Enter Username'
                onChange={(e)=> setUsername(e.target.value)}
                required
                />
        </div>
        <div className='flex justify-between gap-2'>
            <label>Password: </label>
            <input 
                type="password" 
                name="password"
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                />
        </div>
        <div>
            <button className='cursor-pointer bg-white p-1 rounded-lg w-full' type="submit">Login</button>
        </div>
        {/* add loading icon later */}
        </form>
    </div>

  );
};

export default LoginForm;
