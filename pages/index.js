import Layout from "@/components/Layout";
import ButtonActive from "@/components/widgets/ButtonActive";

const Index = () => {
    return (
        <Layout>
            <div className="flex justify-center w-full mt-20">
                <table className="w-[80%]">
                    <thead className=" text-primary tracking-widest text-left font-light ">
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
                        <tr className="text-secundary text-[16px] h-[40px]  ">
                            <td>1</td>
                            <td>3464323532</td>
                            <td>test@gmaill.com</td>
                            <td>2121</td>
                            <td>
                                <ButtonActive text="active" />
                            </td>
                            <td>Editar Excluir</td>
                        </tr>
                        <tr className="text-secundary text-[16px] h-[40px]   ">
                            <td>1</td>
                            <td>3464323532</td>
                            <td>test@gmaill.com</td>
                            <td>2121</td>
                            <td>
                                <ButtonActive text="inactive" color="red" />
                            </td>
                            <td>Editar Excluir</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Index;
