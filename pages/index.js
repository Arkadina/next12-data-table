import { useEffect, useState } from "react";
import Link from "next/link";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

import Layout from "@/components/Layout";
import ButtonActive from "@/components/widgets/ButtonActive";
import Loader from "@/components/widgets/Loader";

const Index = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getInitialData();
    }, []);

    async function getInitialData() {
        setIsLoading(true);
        let res = await getDocs(collection(db, "data"));
        setData(res.docs);
        setIsLoading(false);
    }

    return (
        <Layout>
            <div className="flex justify-center w-full mt-20">
                {isLoading ? (
                    <Loader />
                ) : data ? (
                    <table className="w-[80%]">
                        <thead className=" text-primary tracking-widest text-left font-light">
                            <tr className="mb-10">
                                <th className="">#</th>
                                <th>USER ID</th>
                                <th>EMAIL</th>
                                <th>CREATED_AT</th>
                                <th>STATUS</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr className="text-secundary text-[16px] h-[40px]" key={item.ref.id}>
                                    <td>{i}</td>
                                    <td>{item.ref.id}</td>
                                    <td>{item.data().email}</td>
                                    <td>{item.data().created_at}</td>
                                    <td>
                                        <ButtonActive
                                            text={item.data().activity}
                                            color={
                                                item.data().activity ==
                                                "inactive"
                                                    ? "red"
                                                    : "green"
                                            }
                                        />
                                    </td>
                                    <td>Editar Excluir</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex">
                        <p>No data found. Try create</p>
                        <span className="text-primary underline ml-1">
                            <Link href="/addData">here.</Link>
                        </span>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Index;
