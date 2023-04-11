import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import ButtonAction from "@/components/widgets/ButtonAction";
import ButtonActive from "@/components/widgets/ButtonActive";
import Loader from "@/components/widgets/Loader";

import Link from "next/link";
import { useRouter } from "next/router";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const SearchDataProps = ({ doc_data, doc_id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        setIsLoading(true);
        setData(doc_data);
        setIsLoading(false);
    });

    function handleOnSubmit() {}

    return (
        <Layout>
            <form className="flex flex-row justify-center  w-full mt-20">
                <div className="flex items-center w-[300px] mr-5">
                    <span className="text-primary tracking-widest text-left font-light text-lg mr-5">
                        ID
                    </span>
                    <input
                        type="text"
                        className="w-[250px] outline-none px-2 text-[12px] rounded-md border-2 border-primary h-[40px]"
                        defaultValue={doc_id}
                    />
                </div>
                <ButtonAction text="SEARCH" width="250" left="60" />
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
                                key={doc_id}
                            >
                                <td>{doc_id}</td>
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
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;

    const docRef = doc(db, "data", `${id}`);
    const docSnap = await getDoc(docRef);

    console.log(docSnap);

    return { props: { doc_data: docSnap.data(), doc_id: id } };
}

export default SearchDataProps;
