import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function ButtonAction({ text, width, mt, left }) {
    console.log(left);
    return (
        <button
            className={`flex cursor-pointer w-[${width}px] bg-primary text-white font-bold py-3 items-center justify-center rounded-md mt-[${
                mt ? mt : ""
            }px] hover:opacity-80`}
        >
            {text}
            <ArrowRightIcon className={`h-6 w-6 relative left-[${left}px]`} />
        </button>
    );
}

export default ButtonAction;
