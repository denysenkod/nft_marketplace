"use client";

import { useRouter } from "next/navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../GetIpfs";
import Link from 'next/link';

function truncate(str, length) {
    if (str.length > length) {
      return str.slice(0, length/2) + '...' + str.slice(str.length - length/2, str.length);
    } else return str;
  };

const NFTplate = ({data, onProfilePage}) => {
    return(
        <Link href={{ pathname: "/components/nft-details", query: data}}>
                <div className="border-2 md:mx-5 my-5 grid mx-[210px] md:flex md:flex-col items-center rounded-lg h-[320px] w-[245px] min-w-[220px]  transition shadow-2xl">
                    <img src={data.image} className="w-72 h-80 rounded-lg object-cover"/>
                    <div className="text-white w-full p-2 bg-gradient-to-t from-cyan-300 to-transparent rounded-lg pt-5 sm:-mt-[84px] -mt-[90px]">
                        <div className="text-xl font-bold text-black">{data.name}</div>
                        <div className="flex justify-between sm:mt-1 sm:flex-row flex-row items-start mt-3">
                            <div className="display-inline text-black font-bold">
                                {data.price} ETH
                            </div>
                            <div className="font-bold text-black ">
                                {truncate(onProfilePage ? data.owner : data.seller, 8)}
                            </div>
                        </div>
                    </div>
                </div>
        </Link>
    )
}

export default NFTplate;