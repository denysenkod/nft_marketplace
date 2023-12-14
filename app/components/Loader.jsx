import React from "react";
import Image from "next/image";
import loader from "@/app/components/images/loader.gif";

const Loader = () => (
    <div className="flexCenter w-full my-4">
        <Image src={loader} alt="loader" width={100} objectFit="contain"/>

    </div>
);

export default Loader;