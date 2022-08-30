import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    return (
        <nav className={"flex items-center content-center justify-between w-full px-6 py-4 bg-blue-400 shadow-md text-white"}>
            <div className={"text-xl"}>
                Ecommerce
            </div>
            <ul className={"flex gap-4 text-lg"}>
                <li className={"cursor-pointer hover:text-blue-200 transition-colors"}>
                    <Link to={"/"}>Products</Link>
                </li>
                <li className={"cursor-pointer hover:text-blue-200 transition-colors"}>
                    <Link to={"/categories"}>Categories</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;