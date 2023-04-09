import Layout from "@/components/Layout";
import ButtonActive from "@/components/widgets/ButtonActive";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Index = () => {
    const [data, setData] = useState();

    useEffect(() => {
        getInitialData();
        console.log(data);
    }, []);

    async function getInitialData() {
        let res = await getDocs(collection(db, "data"));
        setData(res.docs);
    }

    return (
        <Layout>
            <div className="flex justify-center w-full mt-20">
                {data ? (
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
                            {data.map((item) => (
                                <tr className="text-secundary text-[16px] h-[40px]">
                                    <td>1</td>
                                    <td></td>
                                    <td>{item.data().email}</td>
                                    <td>2121</td>
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
