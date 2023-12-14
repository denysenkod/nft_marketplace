import axios from "axios";

const fetchNFT = async (nft) => {

    console.log(nft);

    const { data } = await axios.get(nft.tokenURI);

    console.log("DATA", data);

    var price = (data.price);
    var image = (data.image);

    console.log("KKKK", price, image)
    

    return {"price": price, "image": image}
}

export default fetchNFT;