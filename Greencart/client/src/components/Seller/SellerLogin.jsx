import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate } = useAppContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const storedSeller = localStorage.getItem("isSeller");
        if (storedSeller === "true") {
            setIsSeller(true);
        }
    }, []);

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (email.trim() && password.trim()) {
            setIsSeller(true);
            localStorage.setItem("isSeller", "true"); 
            toast.success("Seller login successful!");
        } else {
            toast.error("Please enter both email and password");
        }
    };

    return !isSeller && (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-[80] 
            sm:min-w-[88] rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        type='email' 
                        placeholder="Enter Your Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-200 rounded-md w-full p-2 text-sm outline-primary' 
                        required
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        type='password' 
                        placeholder="Enter Your Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-200 rounded-md w-full p-2 text-sm outline-primary' 
                        required
                    />
                    <button className='mt-4 bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
                </div>
            </div>
        </form>
    )
}

export default SellerLogin;
