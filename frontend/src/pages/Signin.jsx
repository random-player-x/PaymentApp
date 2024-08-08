import { RecoilRoot, useRecoilState } from "recoil";
import { Heading2, Subheading } from "../components/Heading";
import { Inputbox } from "../components/Inputboxes";
import { username, userpassword } from "../atoms/signupatoms";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function SigninPage() {
    const [signinusername, setUsername] = useRecoilState(username);
    const [password, setPassword] = useRecoilState(userpassword);

    return (
        <div className="flex justify-center">
            <div className="shadow-md bg-gray-100 w-[450px] h-auto items-center justify-center m-20 rounded-lg p-5">
                <div className="m-5 flex justify-center">
                    <Heading2 />
                </div>
                <div className="m-5 flex justify-center">
                    <Subheading />
                </div>
                <div className="ml-10 mt-10">
                    <div>
                        <Inputbox onChange={(e) => setUsername(e.target.value)} placeholder="username" label="Username" />
                    </div>
                    <div>
                        <Inputbox onChange={(e) => setPassword(e.target.value)} placeholder="password" label="Password" />
                    </div>
                </div>
                <div className="flex justify-center">
                    <SigninButton username={signinusername} password={password} />
                </div>
                <div className="flex justify-center">
                    <div className="mr-1 text-sm">Not have an account?</div> 
                    <div className="text-sm hover:text-blue-400"><Link to="/">Sign Up</Link></div>
                </div>
            </div>
        </div>
    );
}

function SigninButton({ username, password }) {
    const [signinsuccess, setSigninSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSignin = () => {
        const token = localStorage.getItem('token');

        axios.post('http://localhost:3000/api/v1/user/signin', {
            "username": username,
            "password": password
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            if (res.data.token) {
                setSigninSuccess(true);
                navigate('/dashboard');
            } else {
                setSigninSuccess(false);
            }
        })
        .catch((error) => {
            console.error("Error signing in:", error);
            setSigninSuccess(false);
        });
    };

    return (
        <div className="mt-3">
            <div className="flex justify-center">
                <button onClick={handleSignin} className="border border-black rounded px-3 py-2 font-mono hover:text-white hover:bg-black">Signin</button>
            </div>
            <div className="flex justify-center font-mono text-sm font-bold mt-2 text-red-400 min-h-[20px]">
                {signinsuccess === null ? "" : (signinsuccess ? "Logged in successfully" : "Could not login!")}
            </div>
        </div>
    );
}

export default function SIGNIN() {
    return (
        <RecoilRoot>
            <SigninPage />
        </RecoilRoot>
    );
}
