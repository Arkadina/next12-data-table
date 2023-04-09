import Layout from "@/components/Layout";
import ButtonAction from "@/components/widgets/ButtonAction";

const SearchData = () => {
    return (
        <Layout>
            <form className="flex flex-row justify-center  w-full mt-20">
                <div className="flex items-center w-[300px] mr-5">
                    <span className="text-primary tracking-widest text-left font-light text-lg mr-5">
                        ID
                    </span>
                    <input
                        type="email"
                        className="w-[250px] outline-none px-2 text-[12px] rounded-md border-2 border-primary h-[40px] "
                    />
                </div>
                <ButtonAction text="SEARCH" width="250" left="60" />
            </form>
        </Layout>
    );
};

export default SearchData;
