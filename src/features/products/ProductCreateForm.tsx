import React, {ChangeEvent, useState} from 'react';
import {useGetCategoriesQuery} from "../categories/categoriesApiSlice";
import {FaSave} from "react-icons/fa";
import {toast} from "react-toastify";
import {useCreateProductMutation} from "./productsApiSlice";
import "./ProductCreateForm.css"
import {BsCardImage} from "react-icons/bs";
import {SubmitHandler, useForm, UseFormGetValues} from "react-hook-form";

interface IProductForm {
    name: string,
    price: string,
    categoryId: string,
    image: string
}

function ProductCreateForm() {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const {data: categories, isLoading: isCategoriesLoading} = useGetCategoriesQuery()
    const reader = new FileReader()
    const [createProduct] = useCreateProductMutation()

    const [product, setProduct] = useState<IProductForm>({
        name: "",
        price: "",
        categoryId: "",
        image: ""
    })

    if (isCategoriesLoading) {
        return <div>Loading...</div>
    }

    function handleChooseImage({target}: ChangeEvent<HTMLInputElement>) {

        if (target.files) {
            const file = target.files[0]
            if (file) {
                reader.readAsDataURL(file)
                reader.onloadend = function (ev) {
                    if (ev.target && ev.target.readyState === FileReader.DONE) {
                        const readerResult: string = reader.result as string
                        const base64Image = readerResult
                            .replace('data:', '')
                            .replace(/^.+,/, '');
                        setProduct((prevState) => ({
                            ...prevState,
                            image: base64Image
                        }))
                        toast.success("Image changed!")
                    }
                }
            }
        } else {
            toast.error("Failed to read image!")
        }

    }

    function handleCreateProduct() {
        createProduct({
            name: product.name,
            price: Number(product.price),
            categoryId: Number(product.categoryId),
            image: product.image
        }).unwrap()
            .then(() => {
                toast.success("Created product!")
            })
            .catch(() => toast.error("Failed to create product!"))
    }

    return (
        <div className={"w-[50%] mx-auto mt-4 flex flex-col"}>
            <div className={"border-b border-blue-400 py-4"}>
                <h1 className={"text-2xl text-gray-500"}>New Product</h1>
            </div>
            <form onSubmit={handleSubmit(handleCreateProduct)}>
                <div className={"rounded shadow py-6 px-4 my-4 w-[50%] mx-auto"}>
                    <input
                        {...register("name", {required: true, maxLength: 100})}
                        value={product?.name}
                        onChange={e => setProduct((prevState: IProductForm) => ({
                            ...prevState,
                            name: e.target.value
                        }))}
                        type={"text"}
                        placeholder={"Name"}
                        className={`${errors.name?.type === "required" && "border-red-600"} mb-2 w-full border border-blue-400 px-4 py-2`}
                    />
                    {
                        errors.name?.type === "required" &&
                        <label className={"text-red-600 px-2"}>Name is required!</label>
                    }
                </div>
                <div className={"rounded shadow py-6 px-4 my-4 w-[50%] mx-auto"}>
                    <input
                        {...register("price", {
                            required: {
                                value: true,
                                message: "Price is required!"
                            },
                            pattern: {
                                value: /^[1-9][0-9]*$/,
                                message: "Price should be numeric value!"
                            }
                        })}
                        value={product.price}
                        onChange={e => setProduct((prevState: IProductForm) => ({
                            ...prevState,
                            price: e.target.value
                        }))}
                        type={"text"}
                        placeholder={"Price"}
                        className={`${errors.price && "border-red-600"} mb-2 w-full border border-blue-400 px-4 py-2`}
                    />
                    {
                        errors.price?.message &&
                        <label className={"text-red-600 px-2"}>{errors.price?.message as string}</label>
                    }
                </div>
                <div className={"rounded shadow py-6 px-4 my-4 w-[50%] mx-auto"}>
                    <select
                        {...register("category", {
                            required: {
                                value: true,
                                message: "Category is required!"
                            }
                        })}
                        onChange={e => setProduct((prevState: IProductForm) => ({
                            ...prevState,
                            categoryId: e.target.value
                        }))}
                        className={`${errors.category && "border-red-600"} text-gray-500 w-full mb-2 border border-blue-400 px-4 py-2`}>
                        <option disabled selected value={""}>Category</option>
                        {
                            categories?.map(category => (
                                <option selected={category.id.toString() === product.categoryId} key={category.id}
                                        value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                    {
                        errors.category?.message &&
                        <label className={"text-red-600 px-2"}>{errors.category?.message as string}</label>
                    }
                </div>
                <div className={"rounded shadow py-6 px-4 my-4 w-[50%] mx-auto flex flex-col"}>
                    <label htmlFor={"image-input"}
                           className={`${errors.image && "border-red-600"} cursor-pointer text-gray-500 px-4 py-2 border-blue-400 border`}
                    >
                        <div className={"flex items-center"}>
                            <BsCardImage className={"text-lg mr-2 text-blue-400"}/> Choose Image
                        </div>
                    </label>
                    <input
                        {...register("image", {
                            required: {
                                value: true,
                                message: "Image is required!"
                            }
                        })}
                        id={"image-input"}
                        onChange={handleChooseImage}
                        accept={".jpeg,.png,.jpg"}
                        type={"file"}
                    />
                    {
                        errors.image?.message &&
                        <label className={"text-red-600 px-2"}>{errors.image?.message as string}</label>
                    }
                </div>
                {
                    product.image && (
                        <div className={"rounded shadow py-6 px-4 my-4 w-[50%] mx-auto"}>
                            <img
                                alt={"Image"}
                                src={`data:image/jpg;base64,${product.image}`}
                            />
                        </div>
                    )
                }
                <div className={"w-[50%] mx-auto"}>
                    <input className={"hover:bg-green-400 transition-colors cursor-pointer rounded shadow py-6 px-4 my-4 w-full bg-green-300 text-white font-bold"} type={"submit"}/>
                </div>
            </form>
        </div>
    );
}

export default ProductCreateForm;