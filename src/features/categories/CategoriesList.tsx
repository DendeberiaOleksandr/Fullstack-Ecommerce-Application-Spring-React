import React, {useState} from 'react';
import {useCreateCategoryMutation, useDeleteCategoryByIdMutation, useGetCategoriesQuery} from "./categoriesApiSlice";
import {IoAddCircle} from "react-icons/io5";
import {toast} from "react-toastify";
import {MdDeleteForever} from "react-icons/md";
import {useNavigate} from "react-router-dom";

function CategoriesList() {

    const {data: categories, isLoading} = useGetCategoriesQuery()
    const [createCategory] = useCreateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryByIdMutation()
    const [newCategoryName, setNewCategoryName] = useState<string>('')
    const navigate = useNavigate()

    if (isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className={"w-[50%] mx-auto flex flex-col mt-4"}>

            <div className={"flex justify-end gap-4"}>
                <input
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    className={"shadow-blue-100 shadow-md px-4 py-2"}
                    type={"text"}
                    placeholder={"Name"}
                />
                <button type={"button"} className={"text-3xl text-blue-400"} onClick={() => {
                    createCategory(newCategoryName)
                        .unwrap()
                        .then(() => {
                            toast.success("Successfully created category!")
                            setNewCategoryName('')
                        })
                        .catch(() => {
                            toast.error("Failed to create category!")
                        })
                }}>
                    <IoAddCircle/>
                </button>
            </div>

            <table className={"w-full text-center mt-4 border-collapse"}>
                <thead className={"bg-blue-400 text-white"}>
                <tr>
                    <th className={"px-2 py-1"}>Id</th>
                    <th className={"px-2 py-1"}>Name</th>
                    <th className={"px-2 py-1"}>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    categories?.map(category => (
                        <tr key={category.id} className={"border border-blue-100"}>
                            <td className={"px-2 py-1 cursor-pointer"} onClick={() => navigate(`/categories/${category.id}`)}>{category.id}</td>
                            <td className={"px-2 py-1 cursor-pointer"} onClick={() => navigate(`/categories/${category.id}`)}>{category.name}</td>
                            <td className={"px-2 py-1"}>
                                <MdDeleteForever onClick={() => {
                                    deleteCategory(category.id).unwrap()
                                        .then(() => toast.success("Category successfully deleted!"))
                                        .catch(() => toast.error("Failed to delete category!"))
                                }} className={"cursor-pointer mx-auto text-2xl text-red-600"}/>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
}

export default CategoriesList;