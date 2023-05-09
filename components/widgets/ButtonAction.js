import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function ButtonAction({ text, mt, type = "button" }) {
    return (
        <button
            className={`flex cursor-pointer px-4 min-w-[180px] bg-primary text-white font-bold py-3 items-center justify-center rounded-md mt-[${
                mt ? mt : 0
            }px] hover:opacity-80`}
            type={type}
        >
            <span className="flex items-center justify-center flex-1">
                {text}
            </span>
            <ArrowRightIcon className="h-5 w-5 ml-5" />
        </button>
    );
}

export default ButtonAction;
