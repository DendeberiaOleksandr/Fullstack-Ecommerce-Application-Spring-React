import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetCategoryByIdQuery, useUpdateCategoryMutation} from "./categoriesApiSlice";
import {toast} from "react-toastify";

function CategoryDetails() {

    const {id} = useParams()
    const {data: category, isLoading} = useGetCategoryByIdQuery(id)
    const [updatedCategoryName, setUpdatedCategoryName] = useState('')
    const [updateCategory] = useUpdateCategoryMutation()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className={"flex flex-col my-4 w-[50%] mx-auto"}>
            <h1 className={"text-blue-400 text-2xl mb-2 border-b py-2 border-blue-100"}>Category Details</h1>
            <div className={"flex gap-4 items-center mb-2"}>
                <label className={"text-blue-400 text-xl"}>Id:</label>
                <label className={"text-xl"}>{category.id}</label>
            </div>
            <div className={"flex gap-4 items-center mb-2"}>
                <label className={"text-blue-400 text-xl"}>Name:</label>
                <label className={"text-xl"}>{category.name}</label>
            </div>
            <div className={"flex gap-4 items-center mb-2"}>
                <input
                    className={"px-4 py-2 border border-blue-100 text-lg text-blue-400"}
                    placeholder={"New Name"}
                    type={"text"}
                    value={updatedCategoryName}
                    onChange={e => setUpdatedCategoryName(e.target.value)}
                />
                <button
                    type={"button"}
                    className={"text-lg px-4 py-2 bg-blue-400 text-white"}
                    onClick={() => {
                        updateCategory({
                            id: Number(id),
                            name: updatedCategoryName
                        }).unwrap()
                            .then(() => {
                                toast.success("Successfully updated category!")
                                setUpdatedCategoryName('')
                            })
                            .catch(() => toast.error("Failed to update category!"))
                    }}
                >
                    Update
                </button>
            </div>
        </div>
    );
}

export default CategoryDetails;