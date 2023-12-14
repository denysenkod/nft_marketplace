import BodyProfile from "./BodyProfile";
import { NFTProvider } from "@/context/NFTContext";

export default function Profile() {
    return (
        <div>
            <NFTProvider>
                <BodyProfile />
            </NFTProvider>
        </div>
    );
}


