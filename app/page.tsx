import Image from 'next/image'

import ListNFTModal from "./components/listNFT/ListNFTModal";
import Marketplace from "./components/marketplace/Marketplace";
import ToasterProvider from "./providers/ToasterProvider";
import { NFTProvider } from "../context/NFTContext";


export default function Home() {
  return (
    <div>
      <NFTProvider>
          <ToasterProvider />
          <Marketplace />
        </NFTProvider>
    </div>
  )}
