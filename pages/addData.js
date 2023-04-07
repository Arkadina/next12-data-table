import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import Layout from "@/components/Layout";

const AddData = () => {
    const [optionState, setOptionState] = useState("active");

    return (
        <Layout>
            <form className="flex flex-col justify-center items-center w-full mt-20">
                <div className="flex items-center justify-between w-[400px] ">
                    <span className="text-primary tracking-widest text-left font-light text-lg">
                        EMAIL
                    </span>
                    <input
                        type="email"
                        className="w-[250px] outline-none px-2 text-[12px] rounded-md border-2 border-primary h-[35px] "
                    />
                </div>
                <div className="flex items-center justify-between w-[400px] mt-[30px]">
                    <span className="text-primary tracking-widest text-left font-light text-lg">
                        PASSWORD
                    </span>{" "}
                    <input
                        type="password"
                        className="w-[250px] outline-none px-2 text-[12px] rounded-md border-2 border-primary h-[35px]"
                    />
                </div>
                <div className="flex items-center justify-between w-[400px] mt-[30px]">
                    <span className="text-primary tracking-widest text-left font-light text-lg">
                        ACTIVITY
                    </span>
                    <select
                        defaultValue={optionState}
                        className="flex items-center rounded-md border-2 border-primary bg-transparent text-primary px-3 h-[35px] w-[120px] justify-center"
                    >
                        <option value="active" className="text-black">
                            active
                        </option>
                        <option value="inactive">inactive</option>
                    </select>
                </div>
                <button className="flex cursor-pointer w-[400px] bg-primary text-white font-bold py-3 items-center justify-center rounded-md mt-[40px] hover:opacity-80">
                    CREATE{" "}
                    <ArrowRightIcon className="h-6 w-6 relative left-[130px] " />
                </button>
            </form>
        </Layout>
    );
};

export default AddData;
