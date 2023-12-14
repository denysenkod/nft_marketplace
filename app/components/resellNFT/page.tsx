import ResellNFT from "./ResellNFT";
import { NFTProvider } from "@/context/NFTContext";

export default function Profile() {
    return (
        <div>
            <NFTProvider>
                <ResellNFT />
            </NFTProvider>
        </div>
    );
}


