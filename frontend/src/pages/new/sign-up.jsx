import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MailOption, Lock, User } from "grommet-icons";
import { motion } from "framer-motion";
import BaseLayout from "../../layouts/BaseLayout";
import { auth } from '../../helpers/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
    const [next, setNext] = useSearchParams();
    const navigate = useNavigate();
    const [action, setAction] = useState(next.get("next"));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerLink = () => {
        setNext({ next: "active" });
        setAction("active");
    };

    const loginLink = () => {
        setNext({ next: "" });
        setAction("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            window.alert("Account created");
        } catch (err) {
            console.log(err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.alert("Logged in successfully");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <BaseLayout>
            <div className="w-full h-screen flex items-center justify-center">
                <div
                    className={`relative w-96 h-[28rem] bg-slate-700 text-white rounded-lg flex items-center overflow-hidden transition-height duration-200 ${
                        action === "active" ? "h-[32rem]" : ""
                    }`}
                >
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        variants={fadeInVariants}
                        className={`w-full p-10 transition-transform duration-300 ${
                            action === "active" ? "-translate-x-full" : ""
                        }`}
                    >
                        <form onSubmit={handleLogin}>
                            <h1 className='text-3xl text-center'>Login</h1>
                            <div className='relative w-full h-12 my-6'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full h-full p-4 pl-4 pr-10 bg-transparent border-2 border-white border-opacity-20 rounded-full text-white outline-none'
                                />
                                <MailOption className='absolute right-4 top-1/2 transform -translate-y-1/2 text-lg' />
                            </div>
                            <div className='relative w-full h-12 my-6'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full h-full p-4 pl-4 pr-10 bg-transparent border-2 border-white border-opacity-20 rounded-full text-white outline-none'
                                />
                                <Lock className='absolute right-4 top-1/2 transform -translate-y-1/2 text-lg' />
                            </div>
                            <div className='flex justify-between text-sm mb-4'>
                                <label className='flex items-center'>
                                    <input type='checkbox' className='mr-2' />
                                    Remember me
                                </label>
                                <a href='#' className='hover:underline'>
                                    Forgot Password?
                                </a>
                            </div>
                            <button
                                type='submit'
                                className='w-full h-11 bg-white text-gray-800 font-bold rounded-full shadow-md hover:bg-gray-200'
                            >
                                Login
                            </button>
                            <div className='text-sm text-center mt-5'>
                                <p>
                                    {"Don't have an account? "}
                                    <a
                                        href='#'
                                        onClick={registerLink}
                                        className='font-semibold hover:underline'
                                    >
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </motion.div>

                    <motion.div
                        initial='hidden'
                        animate='visible'
                        variants={fadeInVariants}
                        className={`absolute w-full p-10 transition-transform duration-300 ${
                            action === "active" ? "translate-x-0" : "translate-x-full"
                        }`}
                    >
                        <form onSubmit={handleSubmit}>
                            <h1 className='text-3xl text-center'>Sign Up</h1>
                            <div className='relative w-full h-12 my-6'>
                                <input
                                    type='text'
                                    placeholder='Username'
                                    required
                                    className='w-full h-full p-4 pl-4 pr-10 bg-transparent border-2 border-white border-opacity-20 rounded-full text-white outline-none'
                                />
                                <User className='absolute right-4 top-1/2 transform -translate-y-1/2 text-lg' />
                            </div>
                            <div className='relative w-full h-12 my-6'>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full h-full p-4 pl-4 pr-10 bg-transparent border-2 border-white border-opacity-20 rounded-full text-white outline-none'
                                />
                                <MailOption className='absolute right-4 top-1/2 transform -translate-y-1/2 text-lg' />
                            </div>
                            <div className='relative w-full h-12 my-6'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full h-full p-4 pl-4 pr-10 bg-transparent border-2 border-white border-opacity-20 rounded-full text-white outline-none'
                                />
                                <Lock className='absolute right-4 top-1/2 transform -translate-y-1/2 text-lg' />
                            </div>
                            <div className='flex justify-between text-sm mb-4'>
                                <label className='flex items-center'>
                                    <input type='checkbox' className='mr-2' />I agree to the terms
                                    & conditions
                                </label>
                            </div>
                            <button
                                type='submit'
                                className='w-full h-11 bg-white text-gray-800 font-bold rounded-full shadow-md hover:bg-gray-200'
                            >
                                Register
                            </button>
                            <div className='text-sm text-center mt-5'>
                                <p>
                                    {"Already have an account?" + " "}
                                    <a
                                        href='#'
                                        onClick={loginLink}
                                        className='font-semibold hover:underline'
                                    >
                                        Login
                                    </a>
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default LoginForm;