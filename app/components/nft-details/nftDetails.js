"use client";
import { useState, useEffect, useContext} from "react";
import { NFTContext } from "@/context/NFTContext";
import NFTplate from "@/app/components/marketplace/NFTplate";
import Loader from "@/app/components/Loader";
import Navbar from "../navbar/Navbar";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import  Button from "../Button";
import Modal from "@/app/components/Modal";

function truncate(str, length) {
    if (str.length > length) {
      return str.slice(0, length/2) + '...' + str.slice(str.length - length/2, str.length);
    } else return str;
  };
  
const PaymentBodyCmp = ({ nft, nftCurrency }) => (
    <div className="flex flex-col">
        <div className="flex justify-between">
            <p className="font-semibold text-base minlg:text-xl mx-3">Item</p>
            <p className="font-semibold text-base minlg:text-xl">Subtotal</p>
        </div>
        <div className="flex justify-between my-5">
            <div className="flex-1 flex justify-start ">
                <div className="relative w-28 h-28">
                    <Image src={nft.image} layout="fill" objectFit="cover" />
                </div>
                <div className="flex justify-center flex-col ml-1 md:ml-5 text-sm font-semibold lg:text-xl">
                    <p>{truncate(nft.seller, 7)}</p>
                    <p>{nft.name}</p>
                </div>
            </div>
            <div>
                    <p className="font-normal text-sm lg:text-xl">{nft.price} <span className="font-semibold">ETH</span></p>
            </div>
        </div>
        <div className="flex justify-between mt-10">
                <p className="font-normal text-base lg:text-xl">Total</p>
                <p className="font-normal text-sm lg:text-xl">{nft.price} <span className="font-semibold">ETH</span></p>
            </div>
    </div>
);

const NftDetails = () => {
    const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
    const [isLoading, setIsLoading] = useState(true);
    const [nft, setNft] = useState({ image: " ", tokenId: "", name: "", owner: "", price: "", seller: "", description: "", tokenURI: ""});
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paymentModal, setPaymentModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    console.log("OKOKOKOKOKOKOK", nft);

    useEffect(() => {

        setNft({
            ...nft, 
            image: searchParams.get("image"), 
            tokenId: searchParams.get("tokenId"), 
            name: searchParams.get("name"), 
            owner: searchParams.get("owner"), 
            price: searchParams.get("price"), 
            seller: searchParams.get("seller"),
            description: searchParams.get("description"),
            tokenURI: searchParams.get("tokenURI")
        });

        setIsLoading(false);
    }, []);

    const checkout = async () => {
        await buyNFT(nft, router);


        
        setPaymentModal(false);
        setSuccessModal(true);
    }

    if (isLoading) return <Loader />;

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="pt-[130px] flex justify-center md:flex-row flex-col min-h-screen px-[20px]">
                <div className="relative flex-1 justify-center flexCenter p-12 border-r-0 sm:border-b border-nft-black-1">
                    <div className="relative md:w-[557px] minmd:w-2/3 sm:px-4  minmd:h-2/3  h-[557px]">
                        <Image src={nft.image} alt="NFT image" objectFit="cover" className="rounded-xl shadow-lg" layout="fill"/>
                    </div>
                </div>
                <div className="flex-1 justify-start sm:px-4 px-12 by-6 sm:pb-4">
                    <div className="flex flex-row sm:flex-col mt-3">
                        <h2 className="text-nft-black-1 font-bold text-3xl minlg:text-4xl">{nft.name}</h2>
                    </div>
                    <div className="mt-10 ">
                        <p className="text-nft-black-1 font-semibold text-lg minlg:text-xl">Creator</p>
                        <div className="flex flex-row items-center mt-3">
                            <p>
                                {truncate(nft.seller, 25)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col">
                        <div className="w-full border-b border-black-1 flex flex-row">
                            <p className=" minlg:text-base font-semibold mb-2 text-lg minlg:text-xl">Details</p>
                        </div>
                        <div className="mt-3">
                            <p className="text-base font-normal text-nft-black-1">
                                {nft.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row sm:flex-col my-10">
                        {currentAccount === nft.seller.toLowerCase()
                            ? (
                            <p className="text-base font-normal border border-gray p-2">
                                You can not buy your own NFT
                            </p>
                            ) : currentAccount === nft.owner.toLowerCase() 
                            ?  (
                                <Button 
                                    btnName="List on Marketplace"
                                    classStyles="mr-5 mb-5 sm:mr-0 rounded-1xl"
                                    handleClick={() => router.push(`/components/resellNFT?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                                />
                            ) : (
                                <Button 
                                    btnName={`Buy for ${nft.price} ETH`}
                                    classStyles="mr-5 mb-5 sm:mr-0 rounded-1xl"
                                    handleClick={() => setPaymentModal(true)}
                                />
                            )
                        }
                    </div>
                </div>
                {paymentModal && (
                <Modal 
                    header="Purchase an NFT"
                    body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency}/>}
                    footer={(
                        <div className="flex sm:flex-row flex-col">
                            <Button 
                                btnName="Buy"
                                classStyles="px-20 mb-2 mr-0 sm:mb-0 sm:mr-4 rounded-xl"
                                handleClick={checkout}
                            />
                            <Button 
                                btnName="Cancel"
                                classStyles="px-20 rounded-xl"
                                handleClick={() => setPaymentModal(false)}
                            />
                        </div>
                    )}
                    handleClose={() => setPaymentModal(false)}
                />
                )}

                {successModal && (
                <Modal 
                    header="Payment successful"
                    body={(
                        <div className="flex justify-center items-center flex-col text-center" onClick={() => setSuccessModal(false)}>
                            <div className="relative w-52 h-52">
                                <Image src={nft.image} objectFit="cover" layout="fill"/>                            
                            </div>
                            <p className="font-normal text-md lg:text-xl mt-10">You successfully purchased <span className="font-semibold">{nft.name} from <span className="font-semibold">{truncate(nft.seller, 10)}</span></span></p>
                        </div>

                    )}
                    footer={(
                        <div className="flex justify-center flex-col">
                            <Button 
                                btnName="Check it out"
                                classStyles="mb-5 mr-0 sm:mb-0 sm:mr-0 rounded-xl"
                                handleClick={() => router.push("/components/profile")}
                            />
                        </div>
                    )}
                    handleClose={() => setSuccessModal(false)}
                />)}
            </div>
        </div>
    )
}

export default NftDetails;
