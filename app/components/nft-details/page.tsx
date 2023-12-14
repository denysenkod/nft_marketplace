import NftDetails from "./nftDetails";
import { NFTProvider } from "@/context/NFTContext";

export default function details() {
    return (
        <div>
            <NFTProvider>
                <NftDetails />
            </NFTProvider>
        </div>
    );
}
