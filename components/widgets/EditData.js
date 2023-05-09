import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { doc, setDoc } from "firebase/firestore";
import ButtonAction from "./ButtonAction";
import { db } from "@/config/firebase";

function EditData({ data, handleIsVisible }) {
    const [optionState, setOptionState] = useState(data.activity);
    const [inputPassword, setInputPassword] = useState(data.password);
    const [inputEmail, setInputEmail] = useState(data.email);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    console.log(data);

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    async function handleOnSubmit(e) {
        e.preventDefault();
        let docRef = doc(db, "data", data.id);
        await setDoc(
            docRef,
            {
                email: inputEmail,
                password: inputPassword,
                activity: optionState,
            },
            { merge: true }
        );

        handleIsVisible()
    }

    return (
        <div
            className={`w-full absolute flex justify-center items-center cursor-pointer`}
            style={{
                height: `${windowSize.height - 80}px`,
            }}
            onClick={(e) => {
                handleIsVisible();
            }}
        >
            <div
                className="h-[400px] px-6 py-5 w-[500px] bg-slate-50 rounded-lg flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex justify-end items-center">
                    <XMarkIcon
                        className="h-5 w-5 ml-5"
                        onClick={() => handleIsVisible()}
                    />
                </div>
                <form
                    className="flex flex-col justify-center items-center w-full mt-10"
                    onSubmit={handleOnSubmit}
                >
                    <div className="flex items-center justify-between w-[400px] ">
                        <span className="text-primary tracking-widest text-left font-light text-lg">
                            EMAIL
                        </span>
                        <input
                            type="email"
                            className="w-[250px] outline-none px-2 text-[12px] rounded-md border-2 border-primary h-[40px]"
                            onChange={(e) => setInputEmail(e.target.value)}
                            defaultValue={inputEmail}
                        />
                    </div>
                    <div className="flex items-center justify-between w-[400px] mt-[30px]">
                        <span className="text-primary tracking-widest text-left font-light text-lg">
                            PASSWORD
                        </span>{" "}
                        <input
                            type="password"
                            className="w-[250px] outline-none px-2 text-[12px] rounded-md border-2 border-primary h-[40px]"
                            onChange={(e) => setInputPassword(e.target.value)}
                            defaultValue={inputPassword}
                        />
                    </div>
                    <div className="flex items-center justify-between w-[400px] mt-[30px]">
                        <span className="text-primary tracking-widest text-left font-light text-lg">
                            ACTIVITY
                        </span>
                        <select
                            defaultValue={optionState}
                            className="flex items-center rounded-md border-2 border-primary bg-transparent text-primary px-3 h-[40px] w-[120px] justify-center"
                            onChange={(e) => setOptionState(e.target.value)}
                        >
                            <option
                                value="active"
                                className="text-black"
                                defaultValue={optionState}
                            >
                                active
                            </option>
                            <option value="inactive">inactive</option>
                        </select>
                    </div>

                    <ButtonAction text="UPDATE" mt="30" type="submit" />
                </form>
            </div>
        </div>
    );
}

export default EditData;
