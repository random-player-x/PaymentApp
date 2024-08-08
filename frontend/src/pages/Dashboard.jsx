import { useSetRecoilState, useRecoilState, RecoilRoot } from "recoil";
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {senduser} from '../atoms/dashboardatoms'

export function Dashboard(){
    return(
        <RecoilRoot>
            <div className="m-10 font-bold text-3xl">
                Payments APP
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className=" font-mono text-lg font-thin mb-1">
                    <BalanceDisplay />
                </div>
                <hr className ="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                Users
                <div>
                    <RenderUsers />
                </div>
            </div>
        </RecoilRoot>
    );
}

export function BalanceDisplay(){
    const [balance, setBalance] = useState(0)
    useEffect(()=> {
        axios.get('http://localhost:3000/api/v1/account/balance',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => setBalance(response.data.balance) )
    })
    return(
        <div>
            Your balance is: ${balance}
        </div>
    );
}

export function User({ user }){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between mt-3 bg-gray-100">
            <div className="font-semibold text-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                {user.firstName}
            </div>
            <div className="flex justify-end">
                <button onClick={(e) => {
                navigate("/transfermoney?id=" + user._id + "&name=" + user.firstName);
            }} className="font-light text-sm border border-black rounded-lg py-2 px-2 hover:text-white hover:bg-green-400">send money</button>
            </div>
        </div>
    );
}

export function RenderUsers() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 text-lg border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key = {user._id} user={user} />)}
        </div>
    </>
}
