"use client";

import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useState, useContext, useEffect, SetStateAction } from "react";
import NFTplate from "./NFTplate";
import { NFTContext } from "@/context/NFTContext";

import nextId from "react-id-generator";

export default function Marketplace () {

    const sampleData = [
        {   
            "id" : "123",
            "name": "NFT#1",
            "description": "Alchemy's First NFT",
            "website":"http://axieinfinity.io",
            "image":"https://upload.wikimedia.org/wikipedia/commons/f/fa/AZOV_logo.svg",
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "id" : "1234",
            "name": "NFT#2",
            "description": "Alchemy's Second NFT",
            "website":"http://axieinfinity.io",
            "image":"https://upload.wikimedia.org/wikipedia/commons/3/35/3%D0%BE%D1%88%D0%B1%D1%80_logo.svg",
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "id" : "1235",
            "name": "NFT#3",
            "description": "Alchemy's Third NFT",
            "website":"http://axieinfinity.io",
            "image":"https://upload.wikimedia.org/wikipedia/commons/2/2c/AZOV_Logo_%28SSO_Kyiv%29.svg",
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
    ];

    const [data, updateData] = useState(sampleData);
    const { fetchNFTs } = useContext(NFTContext);
    const [nfts, setNfts] = useState([]);

    // useEffect(() => {
        
    //     fetchNFTs()
    //         .then((items: any) => {
    //             setNfts(items);

    //             console.log(items);
    //         });
    // }, []);



    return (
        <div className="relative">
            <div>
                <Navbar />
            </div>
                <div className="
                    flex 
                    flex-col 
                    place-items-center
                    pt-[60px]
                    md:pt-[110px]
                ">
                    <div className="text-xl md:text-2xl font-bold text-zinc-500">
                        Top NFTs
                    </div>
                    <image src="https://upload.wikimedia.org/wikipedia/commons/2/2c/AZOV_Logo_%28SSO_Kyiv%29.svg" />
                    <NFTplate data={sampleData[0]} key={1} onProfilePage={true}/>
                        
                    <div className="
                        flex 
                        mt-5 
                        justify-center
                        flex-wrap 
                        max-w-screen-xl 
                        text-center
                    ">
                        {sampleData.reverse().map((value, index) => {
                            return <NFTplate data={value} key={index} onProfilePage={true}/>
                        })}
                    </div>
            </div>
        </div>
    )
}
