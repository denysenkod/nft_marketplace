"use client";

import axios from "axios";

import { useCallback, useState, useContext, useMemo } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { NFTContext } from "@/context/NFTContext";
import { useDropzone } from "react-dropzone";
import { useTheme } from "next-themes";
import  Button from "../Button";
import Navbar from "../navbar/Navbar";
import { useRouter } from 'next/navigation';


import useListNFTModal from "@/app/hooks/useListNFTModal";
import Heading from "../Heading";
import Input from "../Inputs/Input";

const ListNFTModal = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const { theme } = useTheme();
    const ListNFTModal = useListNFTModal();
    const [isLoading, setIsLoading] = useState(false);
    const { uploadToIPFS, createNFT } = useContext(NFTContext);
    const [formInput, setFormInput] = useState({name: '', description: '', price: ''});
    const router = useRouter();

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadToIPFS(acceptedFile[0]);
        
        console.log({ url });

        setFileUrl(url);
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        maxSize: 5000000,
    });
    

    const fileStyle = useMemo(() => (
        `bg-white border border-2 border-black flex flex-col items-center p-5 rounded-md border-dashed cursor-pointer
        ${isDragActive && "border-file-active"}
        ${isDragAccept && "border-file-accept"}
        ${isDragReject && "border-file-reject"}
        `
     ), [isDragActive, isDragAccept, isDragReject]
    );
    

    return(
        <div>
            <div>
                <Navbar />
            </div>
            <div className="flex justify-center sm:px-10 p-12">
                <div className="w-4/5 md:w-full pt-[80px]">
                    <div className="flex justify-center border-dashed border-b-4 border-stone-300">
                        <h1 className="font-bold text-2xl minlg:text-4xl ml-4 xs:ml-0 pb-[10px]">
                            Create new NFT
                        </h1>
                    </div>
                    <div className="mt-8">
                        <p className="font-semibold text-xl">Upload File</p>
                        <div className="mt-4">
                            <div {...getRootProps()} className={fileStyle}>
                                <input {...getInputProps()}/>
                                <div className="flexCenter flex-col text-center">
                                    <p className="text-lg text-black-500 font-semibold">
                                        PNG, GIF, SVG, WEBM MAX 100mb
                                    </p>
                                </div>
                            </div>
                            {fileUrl && (
                                <aside >
                                    <div className="flex justify-center mt-2">
                                        <img src={fileUrl} alt="asset_file" className="max-h-[250px]"/>
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>
                    <Input 
                        inputType="name"
                        title="Name"
                        placeholder=""
                        isTextarea={false}
                        label="NFT Name"
                        handleClick={(e) => setFormInput({...formInput, name: e.target.value })}
                    />
                    <Input 
                        inputType="description"
                        title="Name"
                        placeholder=""
                        isTextarea={true}
                        label="NFT Description"
                        handleClick={(e) => setFormInput({...formInput, description: e.target.value})}
                    />
                    <Input 
                        inputType="number"
                        title="Name"
                        placeholder=""
                        isTextarea={false}
                        label="NFT Price"
                        handleClick={(e) => setFormInput({...formInput, price: e.target.value})}
                    />
                    <div className="mt-7 w-full flex justify-center">
                        <Button btnName="Create NFT" classStyles="" handleClick={() => createNFT(formInput, fileUrl, router)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListNFTModal;