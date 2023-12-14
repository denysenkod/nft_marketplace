"use client";

interface OptionsItemProps {
    onClick?: () => void;
    label: string;
}

const OptionsItem: React.FC<OptionsItemProps> = ({
    onClick,
    label
}) => {
    return(
        <div onClick={onClick}>
            {label}
        </div>
    )
}

export default OptionsItem;