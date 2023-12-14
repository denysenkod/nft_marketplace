import React from "react";

const Button = ({btnName, classStyles, handleClick}) => (
    <button
        type="button"
        onClick={handleClick}
        className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        bg-sky-500
        text-white
        py-3
        test-md
        font-semibold
        border-2
        px-4
        ${classStyles}
        `}>
        {btnName}
    </button>
)

export default Button;


