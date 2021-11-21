import React from "react";

const Signup = () => {

    return(
        <div className="min-h-screen flex items-center justify-center bg-purple-400">
            <div className = "bg-white p-16 rounded shadow-2xl w-2/3">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Sign Up</h2>
                <form className="space-y-5">
                    <div>
                        <label className="block mb-1 font-bold text-gray-500">Name</label>
                        <input type="text" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus-border-purple-400"/>
                    </div>

                    <div>
                        <label className="block mb-1 font-bold text-gray-500">Email</label>
                        <input type="email" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus-border-purple-400"/>
                    </div>

                    <div>
                        <label className="block mb-1 font-bold text-gray-500">Password</label>
                        <input type="password" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus-border-purple-400"/>
                    </div>
                    <div>
                        <input type="checkbox" />
                        <label className="ml-2 text-gray-700 text-sm">I agree to terms and privacy</label>
                    </div>

                    <button className="block w-full bg-purple-400 py-4 hover:bg-purple-300 rounded text-purple-900 hover:text-purple-800 transition duration-300">Sign Up</button>

                </form>

            </div>

        </div>
    )
}

export default Signup;