"use client"

import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

type Form = {
    email: string;
    password: string;
};

export default function Home() {

    const [formInput, setFormInput] = useState<Form>({
        email: '',
        password: ''
    });
    const navigate = useRouter();
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formInput, {
                headers: {
                    'Content-Type': 'application/json',

                }
            });
            const user= response.data;
            console.log(user);
            localStorage.setItem('user', JSON.stringify(response.data));
            // Debugging purpose
            // console.log("User data is as follows",JSON.parse(localStorage.getItem('user')!));
            if (user.hasOwnProperty('adminDetails')){
                navigate.push('/adm-dash');
            }
            else if (user.hasOwnProperty('employeeDetails')){
                navigate.push('/emp-dash');
            }
            else{
                navigate.push('/mng-dash');
            }
        }
        catch (e){
            console.log(e);
        }
    }
    return (
        <main>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={(e) => setFormInput({...formInput, email: e.target.value})}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => setFormInput({...formInput, password: e.target.value})}
                                        placeholder="••••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">

                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Sign in
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}