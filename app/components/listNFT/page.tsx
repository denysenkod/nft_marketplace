import ListNFTModal from "./ListNFTModal";
import { NFTProvider } from "@/context/NFTContext";

export default function Profile() {
    return (
        <div>
            <NFTProvider>
                <ListNFTModal />
            </NFTProvider>
        </div>
    );
}


