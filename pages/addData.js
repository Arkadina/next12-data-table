import { useState } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

import Layout from "@/components/Layout";
import ButtonAction from "@/components/widgets/ButtonAction";

const AddData = () => {
    const [optionState, setOptionState] = useState("active");
    const [inputPassword, setInputPassword] = useState();
    const [inputEmail, setInputEmail] = useState();
    const router = useRouter();

    async function handleOnSubmit(e) {
        e.preventDefault();

        await addDoc(collection(db, "data"), {
            email: inputEmail,
            password: inputPassword,
            activity: optionState,
            created_at: DateTime.now().toISODate(),
        });

        router.push("/");
    }

    return (
        <Layout>
            <form
                className="flex flex-col justify-center items-center w-full mt-20"
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
                        <option value="active" className="text-black">
                            active
                        </option>
                        <option value="inactive">inactive</option>
                    </select>
                </div>

                <ButtonAction text="CREATE" mt="30" type="submit" />
            </form>
        </Layout>
    );
};

export default AddData;
