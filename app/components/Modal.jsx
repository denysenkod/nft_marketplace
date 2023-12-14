import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { IoMdClose } from "react-icons/io";

const Modal = ({header, body, footer, handleClose}) => {
    const modalRef = useRef(null);
    const { theme } = useTheme();

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) { handleClose(); }
    }

    return (
        <div 
        onClick={handleClickOutside}
        className=" justify-center
            items-center
            flex
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70"
        >
            <div ref={modalRef} className="
                w-3/5 
                md:w-9/12 
                bg-white minlg:w-2/4 
                flex 
                flex-col 
                rounded-lg"
            >
                <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
                    <div className="cursor-pointer" onClick={handleClose}>
                        <IoMdClose size={18} />
                    </div>
                </div>
                <div className="flexCenter w-full text-center p-4">
                    <h2 className="font-normal text-2xl">
                        {header}
                    </h2>
                </div>
                <div className="p-10 sm:px-4 border-t border-b border-gray-1">
                    {body}
                </div>
                <div className="flex justify-center p-4">
                    {footer}
                </div>
            </div>
        </div>
    )

}

export default Modal;