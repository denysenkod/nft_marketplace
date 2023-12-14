'use client';

import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { create } from "ipfs-http-client";
import { MarketAddress, MarketAddressABI } from "./constants";


const projectId = '2VG1mmwv8mdZvqIm2H1r5OiAglE';
const projectSecret = '47f585184a9acb6b139d0dfca4f9530a';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
});

const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfWalletIsConnected = async () => {
    
        if (!window.ethereum) { 
            alert("You must install Metamask in order to use the marketplace");
        };
        
        const accounts = await window.ethereum.request({ method: "eth_accounts"});
    
        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        } else {
            console.log("No accounts found");
        };
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install metamask");
        }

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        setCurrentAccount(accounts[0]);

        window.location.reload()
    }

    const uploadToIPFS = async (file, setFileUrl) => {
        try {
            console.log('Client:', client);
            console.log('Uploading file:', file);

            const added = await client.add({ content: file });

            console.log('Added:', added);

            const url = `https://nftmrkt.infura-ipfs.io/ipfs/${added.path}`;

            

            return url;
        } catch (error) {
            console.log("Error", error);
            console.log("Error uploading file to IPFS SSSSSS");
        }
    };

    const createNFT = async (formInput, fileUrl, router) => {
        const { name, description, price } = formInput;

        if(!name || !description || !price || !fileUrl) return;

        const data = JSON.stringify({ name, description, image: fileUrl});

        try {
            const added = await client.add(data);

            const url = `https://nftmrkt.infura-ipfs.io/ipfs/${added.path}`;

            await createSale(url, price);

            router.push("/");

        } catch(error) {
            console.log(error);
            console.log("Error creating an NFT");
        }
    };

    const nftCurrency = () => {
        return(
            <p className="mt-7 text-gray-500 font-semibold text-lg">ETH</p>
        );
    };
    
    const createSale = async (url, formInputPrice, isReselling, id) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const price = ethers.utils.parseUnits(formInputPrice, "ether");
        const contract = fetchContract(signer);
        const listingPrice = await contract.getListingPrice();

        const transaction = !isReselling
        ? await contract.createToken(url, price, { value: listingPrice.toString()})
        : await contract.resellToken(id, price, { value: listingPrice.toString()});

        await transaction.wait();
    };
    
    const fetchNFTs = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        //const data = await contract.fetchMarketItems();

        try {
            const data = await contract.fetchMarketItems();
            console.log("DATA", data);
        } catch (err) {
            console.error("Error fetching market items:", err);
            return []; // or handle the error differently
        }

        try {
            const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformatedPrice}
            ) => {
                const tokenURI = await contract.tokenURI(tokenId);
                const { data: {image, name, description}} = await axios.get(tokenURI);
                const price = ethers.utils.formatUnits(unformatedPrice, "ether");

                return {
                    price,
                    tokenId: tokenId.toNumber(),
                    seller,
                    owner,
                    image,
                    name,
                    description,
                    tokenURI,
                };
            }));
            return items;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMyNFTsOrListedNFTs = async (type) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        

        const contract = fetchContract(signer);

        const data = type === "fetchItemsListed" 
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();
            

        const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformatedPrice}) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const { data: {image, name, description}} = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(unformatedPrice, "ether");
        
            return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
            };
        }));

        return items;
        
    };

    const buyNFT = async (nft) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = fetchContract(signer);

        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
        
        const transaction = await contract.createMarketSale(nft.tokenId, { value: price});

        await transaction.wait();
    }

    

    return (
        <NFTContext.Provider value = {{ nftCurrency, connectWallet, currentAccount, uploadToIPFS, createNFT, fetchNFTs, fetchMyNFTsOrListedNFTs, buyNFT, createSale }}>
            {children}
        </NFTContext.Provider>
    );
};
