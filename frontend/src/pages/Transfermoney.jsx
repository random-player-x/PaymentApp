import { useRecoilValue, RecoilRoot, useRecoilState } from "recoil";
import { Inputbox } from "../components/Inputboxes";
import { amountAtom } from "../atoms/signupatoms";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Dashboard } from "./Dashboard";


export function TransferMoney(){
    const [amount, setAmount] = useRecoilState(amountAtom);
    const [searchparams] = useSearchParams();
    const name = searchparams.get('name');
        return(
        <div className=" h-screen flex items-center justify-center ">
            <div className="align-center justify-center bg-gray-300 w-[400px] h-[400px] font-mono font-bold text-2xl rounded-lg">
                <div className="mt-7 flex justify-center">TRANSFER MONEY</div>
                <div className="font-medium text-lg mt-10 ml-5 flex bg-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg><div className="ml-2"> {name} </div>
                </div>
                <div className="bg-red-400">
                    <Inputbox  onchange = {(e)=>{
                        setAmount(Number(e.target.value))
                    }} placeholder={"amount"}></Inputbox>
                </div>
                <div className="flex justify-center">
                    <TransferButton></TransferButton>
                </div>
            </div>
        </div>
        
    )
}

function TransferButton(){
    const [searchparams] = useSearchParams();
    const amount = useRecoilValue(amountAtom);
    const id = searchparams.get('id');
    const [message, setMessage] = useState('');
    return(
        <div className="font-medium text-xl">
            <button onClick={()=>{
                axios.post('http://localhost:3000/api/v1/account/transfer',{
                    "amount": amount,
                    "to": id
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then( (response) => {if(response) {
                    alert("Transaction Done")
                    setMessage("transaction done!")
                }})
            }} className="border border-black rounded-lg py-2 px-3 hover:text-black hover:bg-green-400">Transfer</button>
            <div>
                {message}
            </div>
            <div>
            <Link to = "/dashboard" reloadDocument = {true}>
                <div className="font-black text-sm border border-black mt-5 flex justify-center py-3 px-2 bg-pink-200 rounded-lg">dashboard</div>
            </Link> 

            </div>
        </div>
    )
}

export default function Transaction() {
    return (
        <RecoilRoot>
            <TransferMoney />
        </RecoilRoot>
    );
}