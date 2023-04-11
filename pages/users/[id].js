import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

import Layout from "@/components/Layout";
import ButtonAction from "@/components/widgets/ButtonAction";
import ButtonActive from "@/components/widgets/ButtonActive";
import Loader from "@/components/widgets/Loader";
import Alert from "@/components/widgets/Alert";

const SearchDataProps = ({ doc_data, doc_id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const [inputId, setInputId] = useState("");
    const [docId, setDocId] = useState();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setData(doc_data);
        setDocId(doc_id);
        console.log("resetou");
        setIsLoading(false);
    }, []);

    async function handleOnSubmit(e) {
        e.preventDefault();
        const docRef = doc(db, "data", inputId.trim() || doc_id);
        const docSnap = await getDoc(docRef);

        setAlert(null);
        setIsLoading(true);

        if (docSnap.exists()) {
            setData(docSnap.data());
            setDocId(inputId.trim());
        } else {
            setAlert(`Document with id ${docId} does not exist.`);
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
                        defaultValue={doc_id}
                        onChange={(e) => setInputId(e.target.value)}
                    />
                </div>
                <ButtonAction
                    text="SEARCH"
                    width="250"
                    left="60"
                    type="submit"
                />
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
                                key={docId}
                            >
                                <td>{docId}</td>
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
                        <p>No data found. Try search for one.</p>
                    </div>
                )}
            </div>
            {alert && (
                <Alert
                    text={alert}
                    width="350px"
                    height="50px"
                    timeOnScreen="5"
                />
            )}
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;

    const docRef = doc(db, "data", `${id}`);
    const docSnap = await getDoc(docRef);

    const doc_data = docSnap.exists() ? docSnap.data() : "";

    return { props: { doc_data: doc_data, doc_id: id } };
}

export default SearchDataProps;
