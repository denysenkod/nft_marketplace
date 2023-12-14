"use client"

import { useState, useEffect, useContext} from "react";
import { NFTContext } from "@/context/NFTContext";
import NFTplate from "@/app/components/marketplace/NFTplate";
import Loader from "@/app/components/Loader";

const ListedNFTs = () => {
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { fetchMyNFTsOrListedNFTs } = useContext(NFTContext);

    useEffect(() => {
        fetchMyNFTsOrListedNFTs("fetchItemsListed")
            .then((items) => {
                setNfts(items);
                setIsLoading(false);
                console.log(items);
            });
    }, []);

    if (isLoading) {
        return(
                <div className="flexStart min-h-screen">
                    <Loader />
                </div>
        );
    };

    if (!isLoading && nfts.length === 0) {
        return (
            <div className="flex justify-center sm:px-4 p-12 min-h-screen">
                <div className="w-full minmd:w-4/5">
                    <div className="mt-4">
                        <h2 className="font-poppins text-2xl font-semibold mt-2 ml-4 sm:ml-2">
                            No listed NFTs found
                        </h2>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex justify-center sm:px-4 p-12 min-h-screen">
            <div className="w-full minmd:w-4/5">
                <div className="mt-4">
                    <h2 className="font-poppins text-2xl font-semibold mt-2 ml-4 sm:ml-2">
                        NFTs Listed for Sale
                    </h2>
                    <div className=" w-full flex flex-wrap justify-start md:justify-center">
                        {nfts.reverse().map((nft) => <NFTplate key={nfts.tokenId} data={nft} onProfilePage={false}/>)}
                    </div>
                </div>
            </div>
        </div>
    );

    



};

export default ListedNFTs;