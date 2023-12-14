import { create } from 'zustand';

interface ListNFTModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useListNFTModal = create<ListNFTModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useListNFTModal;