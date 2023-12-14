"use client";



import Navbar from "../navbar/Navbar";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../GetIpfs";

export default function NFTpage (props) {

    const [data, setData ] = useState({});
    const [message, setMessage] = useState("");
    const [currentAddress, setCurrentAddress] = useState("0x");

    return (
        <div className="min-h-[100vh]">
            <Navbar />
            <div className="flex ml-20 mt-20">
                <img src={data.image} className="w-2/5"/>
                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        Name: {data.name}
                    </div>
                    <div>
                        Description: {data.description}
                    </div>
                    <div>
                        Price: {data.price + "ETH"}
                    </div>
                    <div>
                        Owner: {data.onwer}
                    </div>
                    <div>
                        Seller: {data.seller}
                    </div>
                    <div>
                        {currentAddress != data.owner && currentAddress != data.seller 
                        ?
                            <button className="
                            enableEthereumButton 
                            bg-blue-500 
                            hover:bg-blue-700 
                            text-white 
                            font-bold 
                            py-2 
                            px-4 
                            rounded 
                            text-sm" 
                            onClick={() => buyNFT(tokenId)}>
                                Buy this NFT
                            </button>
                        :
                            <div className="
                                text-green 
                                text-center
                                mt-3
                            ">
                                {message}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}