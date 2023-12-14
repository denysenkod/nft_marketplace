'use client';

import { RiNftLine } from "react-icons/ri";
import { SiBuymeacoffee } from "react-icons/si";
import OptionsItem from "./OptionsItem";
import useListNFTModal from "@/app/hooks/useListNFTModal";
import Link from 'next/link'
import { useState } from "react";
import { usePathname } from 'next/navigation';

const Options = (data: any) => {
    const ListNFTModal = useListNFTModal();
    const pathname = usePathname();

    const LinkWrapper = ({ href, label, ...props }) => {
        if (href === pathname ) {
          return <OptionsItem label="See Profile" />;
        }
        return (
          <Link href={href} {...props}>
            <OptionsItem label={label}/>
          </Link>
        );
      };

    return(
        <div
            className="
                border-[1px]
                md:w-auto
                w-full
                py-[6px]
                md:py-[12px]
                rounded-full
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
            "
        >
            <div
                className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    min-w-[460px]

                "
            >   
                <div className="
                    text-sm
                    pl-2
                    pr-2
                    flex
                    flex-row
                    items-center
                    gap-3
                    
                ">  
                    <div className="
                        p-2
                        bg-amber-400
                        rounded-full
                        text-white
                    ">
                        <SiBuymeacoffee />
                    </div>
                    <div className="font-semibold pr-4 hover:underline">
                        <LinkWrapper href="http://localhost:3000" label="Buy an NFT"/>
                    </div>

                </div>
                
                <div className="
                    text-sm
                    font-semibold
                    px-6
                    border-x-[1px]
                    flex-1
                    text-center
                    hover:underline
                ">
                    <>
                    <LinkWrapper href="http://localhost:3000/components/listNFT" label="List an NFT"/>
                    
                    </>
                </div>
                <div className="
                    text-sm
                    pl-6
                    pr-2
                    flex
                    flex-row
                    items-center
                    gap-3
                ">
                    <div className="font-semibold hover:underline">
                        <>
                        
                        <LinkWrapper href="http://localhost:3000/components/profile" label="See profile"/>
                    </>
                    </div>
                    <div className="
                        p-2
                        bg-amber-400
                        rounded-full
                        text-white
                        text-white
                    ">
                        <RiNftLine />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Options;