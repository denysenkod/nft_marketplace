"use client"

import { useState, useEffect, useContext } from "react";
import Navbar from "../navbar/Navbar";
import Button from "@/app/components/Button";
import Loader  from "@/app/components/Loader";
import Input from "@/app/components/Inputs/Input";
import { NFTContext } from "@/context/NFTContext";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const ResellNFT = () => {
    const { createSale } = useContext(NFTContext);
    const router = useRouter();
    const [ nft, setNft ] = useState({tokenId : "", tokenURI : ""});
    const searchParams = useSearchParams();
    const [ price, setPrice ] = useState();
    const [ image, setImage ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    
    
    useEffect(() => {

        setNft({
            ...nft, 
            tokenId: searchParams.get("tokenId"), 
            tokenURI: searchParams.get("tokenURI")
        });
        
    }, []);

    const fetchNFT = async () => {
        const { data } = await axios.get(nft.tokenURI);

        setImage(data.image);

        setIsLoading(false);

    }

    useEffect(() => {
        if (nft.tokenURI) {
            fetchNFT();
            setIsLoading(false);
        };
    }, [nft.tokenURI]);

    if (isLoading) {
        return(
                <div className="flexStart min-h-screen">
                    <Loader />
                </div>
        );
    };

    const resell = async () => {
        await createSale(nft.tokenURI, price, true, nft.tokenId)

        router.push("/")
    };

    return(
        <div className="relative">
            <div>
                <Navbar/>
            </div>
            <div className="pt-[130px] flex justify-center items-center py-12 px-4 sm:px-12">
                <div className="w-3/5 md:w-full">
                    <h1 className="font-semibold flex items-center justify-center text-2xl">Resell NFTs</h1>
                        <Input 
                            inputType="number"
                            title="Price"
                            placeholder=""
                            isTextarea={false}
                            label="NFT Price"
                            handleClick={(e) => setPrice(e.target.value)}
                        />
                        <div className="flex items-center justify-center">
                            {image && <img src={image} className="mt-4 flex items-center justify-center rounded-lg" width={350}/>}
                        </div>    
                        <div className="mt-7 flex justify-center">
                            <Button 
                                btnName="List NFT"
                                classStyles="rounded-2xl w-[330px]"
                                handleClick={resell}
                            />
                        </div>
                        
                </div>
            </div>   
        </div>
    );

}

export default ResellNFT;

