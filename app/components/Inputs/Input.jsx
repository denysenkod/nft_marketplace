"use client";

import { useContext } from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { FaEthereum } from "react-icons/fa";
import { useCallback } from "react";
import { NFTContext } from "@/context/NFTContext";

const Input = ({ inputType, title, placeholder, handleClick, isTextarea, label}) => {
    const { nftCurrency } = useContext(NFTContext);

    return(
    <div className="w-full relative">
            {
            isTextarea ?
            <div onChange={handleClick}>
                <textarea 
                    cols={40}
                    rows={5}
                    placeholder=" "
                    className={`
                    peer
                    w-full
                    p-4
                    pt-8
                    mt-8
                    bg-gray-200
                    rounded-lg
                    font-light
                    outline-none
                    cursor-pointer
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    h-[150px]
                `}/>
                <label className={`
                    absolute 
                    cursor-pointer
                    mt-10
                    text-lg
                    text-gray-500 
                    duration-300 
                    transform 
                    -translate-y-4 
                    scale-75 
                    top-4 
                    z-10 
                    origin-[0] 
                    left-2.5 
                    peer-focus:text-blue-600 
                    peer-focus:dark:text-blue-500 
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 
                    peer-focus:-translate-y-4
                `}>
                    {label}
                </label>
            </div>
            : inputType === "number" ?
                <div onChange={handleClick} className="cursor-pointer flex flexBetween bg-gray-200 rounded-lg flex-row bg-rounded-lg mt-4 pr-4">
                    <input 
                        placeholder=" "
                        className={`
                            bg-gray-200
                            rounded-lg
                            cursor-pointer
                            peer
                            w-full
                            p-4
                            pt-10
                            font-light
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                        `}
                    />
                    <label className={`
                        cursor-pointer
                        absolute 
                        text-lg
                        text-gray-500 
                        duration-300 
                        transform 
                        -translate-y-4 
                        scale-75 
                        pt-3
                        top-4 
                        z-10 
                        origin-[0] 
                        left-2.5 
                        peer-focus:text-blue-600 
                        peer-focus:dark:text-blue-500 
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 
                        peer-focus:-translate-y-4
                    `}>
                        {label}
                    </label>
                    <p className="mt-7 text-gray-500 font-semibold text-lg">ETH</p>
                </div>
            :
            <div onChange={handleClick}> 
                <input 
                    placeholder=" "
                    className={`
                        bg-gray-200
                        rounded-lg
                        peer
                        cursor-pointer
                        w-full
                        mt-8
                        p-4
                        pt-8
                        font-light
                        outline-none
                        transition
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                    `} 
                />
                <label className={`
                absolute 
                mt-10
                text-lg
                text-gray-500 
                duration-300 
                transform 
                -translate-y-4 
                scale-75 
                top-4 
                z-10 
                origin-[0] 
                cursor-pointer
                left-2.5 
                peer-focus:text-blue-600 
                peer-focus:dark:text-blue-500 
                peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75 
                peer-focus:-translate-y-4
            `}>
                {label}
            </label>
            </div>
            }
            
    </div>
)};

export default Input;
