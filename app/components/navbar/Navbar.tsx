"use client";

import Container from "../Container";
import Logo from "./Logo";
import Options from "./Options";
import ConnectWallet from "./ConnectWallet";

const Navbar = (data) => {
    return (
        <nav>
            <div className="fixed w-full bg-white z-10 shadow-sm bg-stone-50">
                <div className="
                    py-[2px]
                    border-b-[1px]
                ">
                    <Container>
                        <div className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-3
                            md:gap-0
                        ">
                            <Logo />
                            <Options data={data}/>
                            <ConnectWallet />
                        </div>
                    </Container>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;






