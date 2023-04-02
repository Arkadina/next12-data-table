import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Header() {
    return (
        <header className="flex flex-row h-[80px] w-full  items-center px-40 justify-between">
            <span className="text-2xl font-bold">DataTable</span>
            <nav className="">
                <ul className="flex">
                    <HeaderItem text="Home" href="/" />
                    <HeaderItem text="Add data" href="/addData" />
                    <HeaderItem
                        text="Search for specific Id"
                        href="/searchData"
                    />
                </ul>
            </nav>
            <div className="h-full w-[100px]"></div>
        </header>
    );
}

export default Header;

const HeaderItem = ({ text, href }) => {
    const router = useRouter();

    return (
        <li
            className={`[&:not(:last-of-type)]:mr-6 ${
                router.route == href ? `text-primary` : "text-dark"
            } text-base`}
        >
            <Link href={href}>{text}</Link>
        </li>
    );
};
