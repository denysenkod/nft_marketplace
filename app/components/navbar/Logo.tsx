'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();

    return (
        <Image 
            alt="Logo"
            className="hidden sm:block cursor-pointer rounded-full scale-125 md:scale-150 transition" 
            height="100"
            width="100"
            src="/images/logo-nft.png"
        />
    );
}

export default Logo;