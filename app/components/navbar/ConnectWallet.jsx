'use client';

import { BiSolidWallet } from "react-icons/bi";
import { useState, useCallback, useContext, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";

import { NFTContext } from "@/context/NFTContext";



const ConnectWallet= () => {

    const { connectWallet, currentAccount } = useContext(NFTContext);
    const [ isConnected, setIsConnected ] = useState(false);

    useEffect (() => {

        if (currentAccount.length > 0) {
            setIsConnected(true)
        } else {
            setIsConnected(false)
        }

    }, [currentAccount]);
    
    const ButtonGroup = () => {

        return isConnected ? (
            <Button 
                btnName = "Connected" 
                classStyles=""

            />
        ) : <Button 
                btnName = "Connect" 
                classStyles=""
        />
        
    };
    
    return (
        <div>
            <div onClick={connectWallet}
                className="
                    text-sm
                    px-3
                    py-2
                    flex
                    flex-row
                    items-center
                    gap-3
                    border-[1px]
                    rounded-full
                    shadow-sm
                    hover:shadow-md
                    transition
                    cursor-pointer
                ">
                        <div className="
                            text-sm
                            font-semibold
                            hidden
                            md:block
                        ">
                           <ButtonGroup/>
                        </div>
                        <div className="
                            p-2
                            bg-sky-400
                            rounded-full
                            text-white
                        ">
                            < BiSolidWallet />
                        </div>
            </div>
        </div>
    );
}

export default ConnectWallet