"use client";

export const GetIpfsUrlFromPinata = (pinataUrl) => {
    var ipfsUrl = pinataUrl.split("/");
    const lastIndex = ipfsUrl.length;
    ipfsUrl = "https://ipfs.io/ipfs"+ipfsUrl[lastIndex - 1];
    return ipfsUrl;
};