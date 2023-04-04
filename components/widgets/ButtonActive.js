import React from "react";

function ButtonActive({ text, color }) {
    return (
        <button
            className={`${
                color == "red"
                    ? "bg-red px-[10px] py-[3px]"
                    : "bg-green px-[16px] py-[3px]"
            }  text-white rounded-[4px]`}
        >
            {text}
        </button>
    );
}

export default ButtonActive;
