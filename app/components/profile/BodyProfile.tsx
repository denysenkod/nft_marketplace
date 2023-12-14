"use client";

import { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/Navbar";
import NFTplate from "../marketplace/NFTplate";
import ListedNFTs from "@/app/components/profile/listedNFTs";
import { NFTContext } from "@/context/NFTContext";


function truncate(str, length) {
    if (str.length > length) {
      return str.slice(0, length/2) + '...' + str.slice(str.length - length/2, str.length);
    } else return str;
  };

const BodyProfile = () => {
    const [myNfts, setMyNfts] = useState([]);
    const [data, setData] = useState([]);
    const [address, setAddress] = useState("0x");
    const [totalPrice, setTotalPrice] = useState("0");
    const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  
    useEffect(() => {
        fetchMyNFTsOrListedNFTs()
            .then((items: any) => {
                setMyNfts(items);
                console.log("ITEMS", items);
            });
    }, []);

    return(
        <div className="relative">
            <div>
                <Navbar data={data}/>
            </div>
            <div className="pt-[60px] sm:pt-[110px]">
                    <div className="border-b-[2px] pb-[40px]">
                        <div className="
                            flex 
                            flex-col 
                            text-center 
                            mt-11 
                            md:text-2xl 
                            text-white"
                        >
                            <div className="mb-5 text-black font-semibold">
                                <h2 className="text-black">Wallet address</h2>
                                {truncate(currentAccount, 20)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-center items-center mt-11 text-white">
                        <h2 className="font-poppins text-2xl font-semibold mt-2 ml-4 sm:ml-2 text-black">Your NFTs</h2>
                        <div className="flex justify-center flex-wrap max-w-screen-xl">
                            {myNfts.reverse().map((nft, index) => <NFTplate key={index} data={nft} onProfilePage/>)}
                        </div>
                        <div className="mt-10 text-xl text-black">
                            <ListedNFTs />
                        </div>

                    </div>
                </div>
        </div>
    );

}

export default BodyProfile;

