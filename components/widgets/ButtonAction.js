import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function ButtonAction({ text, width, mt, left, type }) {
    return (
        <button
            className={`flex cursor-pointer w-[${width}px] bg-primary text-white font-bold py-3 items-center justify-center rounded-md mt-[${
                mt ? mt : 0
            }px] hover:opacity-80`}
            type={`${type ? type : "button"}`}
        >
            {text}
            <ArrowRightIcon className={`relative left-[${left}px] h-6 w-6 `} />
        </button>
    );
}

export default ButtonAction;
