import React from 'react';
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import ProductsList from "./features/products/ProductsList";
import CategoriesList from "./features/categories/CategoriesList";
import {ToastContainer} from "react-toastify";
import CategoryDetails from "./features/categories/CategoryDetails";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import ProductCreateForm from "./features/products/ProductCreateForm";
import ProductDetails from "./features/products/ProductDetails";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<ProductsList/>}/>
                <Route path={"new"} element={<ProductCreateForm/>}/>
                <Route path={"details/:id"} element={<ProductDetails/>}/>
                <Route path={"categories"} element={<CategoriesList/>}/>
                <Route path={"categories/:id"} element={<CategoryDetails/>}/>
            </Routes>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
            />
        </>
    );
}

export default App;
