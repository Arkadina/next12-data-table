import { useEffect, useState } from "react";
import Link from "next/link";

import { db } from "@/config/firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

import Layout from "@/components/Layout";
import ButtonActive from "@/components/widgets/ButtonActive";
import Loader from "@/components/widgets/Loader";
import EditData from "@/components/widgets/EditData";

const Index = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [editData, setEditData] = useState();

    useEffect(() => {
        getInitialData();
    }, []);

    async function getInitialData() {
        setIsLoading(true);

        let docsRef = collection(db, "data");
        await onSnapshot(docsRef, (snapshot) => {
            setData(snapshot.docs);
            setIsLoading(false);
        });
    }

    async function handleDelete(id) {
        setIsLoading(true);
        let docRef = doc(db, "data", id);
        await deleteDoc(docRef);
        getInitialData();
        setIsLoading(false);
    }

    function handleIsVisible() {
        setIsVisible(!isVisible);
    }

    return (
        <Layout>
            {isVisible && (
                <EditData handleIsVisible={handleIsVisible} data={editData} />
            )}
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
                                <tr
                                    className="text-secundary text-[16px] h-[40px]"
                                    key={item.ref.id}
                                >
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
                                    <td>
                                        <div className="w-[120px] flex justify-between">
                                            <button
                                                onClick={() => {
                                                    handleIsVisible();
                                                    setEditData({
                                                        ...item.data(),
                                                        id: item.ref.id,
                                                    });
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.ref.id)
                                                }
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
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
