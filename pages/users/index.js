import { useState } from "react";

import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

import Layout from "@/components/Layout";
import ButtonAction from "@/components/widgets/ButtonAction";
import ButtonActive from "@/components/widgets/ButtonActive";
import Loader from "@/components/widgets/Loader";
import Alert from "@/components/widgets/Alert";

const SearchDataIndex = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const [inputId, setInputId] = useState("");
    const [alert, setAlert] = useState(null);

    async function handleOnSubmit(e) {
        e.preventDefault();

        setIsLoading(true);
        const docRef = doc(db, `data/${inputId.trim()}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setData(docSnap.data());
        } else {
            setAlert(
                `Document with id ${inputId.slice(0, 18)}... does not exist.`
            );
            setData();
        }

        setIsLoading(false);
    }

    return (
        <Layout>
            <form
                className="flex flex-row justify-center  w-full mt-20"
                onSubmit={handleOnSubmit}
            >
                <div className="flex items-center w-[300px] mr-5">
                    <span className="text-primary tracking-widest text-left font-light text-lg mr-5">
                        ID
                    </span>
                    <input
                        type="text"
                        className="w-[250px] outline-none px-2 text-[12px] rounded-md border-2 border-primary h-[40px]"
                        onChange={(e) => setInputId(e.target.value)}
                    />
                </div>
                <ButtonAction text="SEARCH" type="submit" />
            </form>
            <div className="flex justify-center w-full mt-20">
                {isLoading ? (
                    <Loader />
                ) : data ? (
                    <table className="w-[80%]">
                        <thead className=" text-primary tracking-widest text-left font-light">
                            <tr className="mb-10">
                                <th>USER ID</th>
                                <th>EMAIL</th>
                                <th>CREATED_AT</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className="text-secundary text-[16px] h-[40px]"
                                key={inputId}
                            >
                                <td>{inputId}</td>
                                <td>{data.email}</td>
                                <td>{data.created_at}</td>
                                <td>
                                    <ButtonActive
                                        text={data.activity}
                                        color={
                                            data.activity == "inactive"
                                                ? "red"
                                                : "green"
                                        }
                                    />
                                </td>
                                <td>Editar Excluir</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <div className="flex">
                        <p>
                            No data found. Try
                            <span className="text-primary"> search </span>for
                            one.
                        </p>
                    </div>
                )}
            </div>
            {alert && <Alert text={alert} timeOnScreen="5" />}
        </Layout>
    );
};

export default SearchDataIndex;
