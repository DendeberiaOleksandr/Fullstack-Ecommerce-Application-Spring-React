import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetProductByIdQuery, useUpdateProductMutation} from "./productsApiSlice";
import {useForm} from "react-hook-form";
import {useGetCategoriesQuery} from "../categories/categoriesApiSlice";
import {AiFillDollarCircle, AiFillEdit} from "react-icons/ai";
import {IoCheckmarkOutline, IoCloseOutline} from "react-icons/io5";
import {toast} from "react-toastify";
import {ImCart} from "react-icons/im";
import {MdCategory} from "react-icons/md";

export interface ProductUpdateDto {
    name: string
    categoryId: string
    price: string
    image: string
}

enum EditState {
    NONE = 0,
    NAME = 1,
    PRICE = 2,
    CATEGORY = 3,
    IMAGE = 4
}

function ProductDetails() {

    const reader = new FileReader()

    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const imageRef = useRef<HTMLInputElement>(null)

    const [updateProduct] = useUpdateProductMutation()

    const [editState, setEditState] = useState<EditState>(EditState.NONE)
    const {id} = useParams()
    const {data: product, isLoading: isProductLoading} = useGetProductByIdQuery(id ?? "")
    const {data: categories, isLoading: isCategoriesLoading} = useGetCategoriesQuery()
    const [formData, setFormData] = useState<ProductUpdateDto>({
        name: "",
        categoryId: "",
        price: "",
        image: ""
    })

    if (isProductLoading || isCategoriesLoading) {
        return <div>Loading...</div>
    }

    const isFormValid = () => {
        return formData.name || formData.price || formData.image || formData.categoryId
    }

    const handleUpdateProduct = () => {
        if (isFormValid() && id) {
            updateProduct({
                id,
                data: {
                    categoryId: formData.categoryId,
                    name: formData.name,
                    price: formData.price,
                    image: formData.image
                }
            }).unwrap()
                .then(() => toast.success("Product updated!"))
                .catch(() => toast.error("Failed to update product!"))
        } else {
            toast.error("Provide new data!")
        }
    }

    const handleEditNameConfirm = () => {
        if (nameRef?.current?.value.match(/^.{1,100}$/)) {
            setFormData(prevState => ({
                ...prevState,
                name: nameRef?.current?.value || ""
            }))
            toast.success("Name changed!")
            setEditState(EditState.NONE)
        } else {
            toast.error("Failed to change name!")
        }
    }

    const handleEditPriceConfirm = () => {
        if (priceRef?.current?.value.match(/^[1-9][0-9]*$/)) {
            setFormData(prevState => ({
                ...prevState,
                price: priceRef?.current?.value || ""
            }))
            toast.success("Price changed!")
            setEditState(EditState.NONE)
        } else {
            toast.error("Failed to change price!")
        }
    }

    const handleEditCategoryConfirm = () => {
        setFormData(prevState => ({
            ...prevState,
            categoryId: categoryRef?.current?.value || ""
        }))
        setEditState(EditState.NONE)
    }

    const handleChooseImage = ({target}: ChangeEvent<HTMLInputElement>) => {
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
                        setFormData(prevState => ({
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

    return (
        <div className={"w-[50%] mx-auto mt-4 flex flex-col"}>
            <div className={"border-b border-blue-400 py-4"}>
                <h1 className={"text-2xl text-gray-500"}>New Product</h1>
            </div>
            <div>
                <div className={"items-center flex justify-between rounded shadow py-6 px-4 my-4 w-[50%] mx-auto"}>
                    {
                        editState === EditState.NAME ? (
                            <>
                                <input
                                    ref={nameRef}
                                    className={"border border-blue-400 px-4 py-2"}
                                    type={"text"}
                                    placeholder={"Name"}
                                    defaultValue={formData.name ? formData.name : product?.name}
                                />
                                <div className={"flex gap-2 text-lg"}>
                                    <div className={"p-2 rounded-[50%] hover:bg-gray-200"}>
                                        <IoCheckmarkOutline onClick={() => handleEditNameConfirm()}/>
                                    </div>
                                    <div className={"p-2 rounded-[50%] hover:bg-gray-200"}>
                                        <IoCloseOutline onClick={() => {
                                            setFormData(prevState => ({
                                                ...prevState,
                                                name: ""
                                            }))
                                            setEditState(EditState.NONE)
                                        }}/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <ImCart className={"text-xl text-blue-700"}/>
                                <label
                                    className={"text-gray-600 font-semibold"}>{formData.name ? formData.name : product?.name}</label>
                                <div onClick={() => setEditState(EditState.NAME)}
                                     className={"p-2 hover:bg-gray-200 rounded-[50%] transition-colors"}>
                                    <AiFillEdit className={"text-lg text-gray-600"}/>
                                </div>
                            </>
                        )
                    }
                </div>

                <div className={"items-center flex justify-between rounded shadow py-6 px-4 my-4 w-[50%] mx-auto"}>
                    {
                        editState === EditState.PRICE ? (
                            <>
                                <input
                                    ref={priceRef}
                                    className={"border border-blue-400 px-4 py-2"}
                                    type={"text"}
                                    placeholder={"Price"}
                                    defaultValue={formData.price ? formData.price : product?.price}
                                />
                                <div className={"flex gap-2 text-lg"}>
                                    <div className={"p-2 rounded-[50%] hover:bg-gray-200"}>
                                        <IoCheckmarkOutline onClick={() => handleEditPriceConfirm()}/>
                                    </div>
                                    <div className={"p-2 rounded-[50%] hover:bg-gray-200"}>
                                        <IoCloseOutline onClick={() => {
                                            setFormData(prevState => ({
                                                ...prevState,
                                                price: ""
                                            }))
                                            setEditState(EditState.NONE)
                                        }}/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <AiFillDollarCircle className={"text-xl text-blue-700"}/>
                                <label
                                    className={"text-gray-600 font-semibold"}>{formData.price ? formData.price : product?.price}</label>
                                <div onClick={() => setEditState(EditState.PRICE)}
                                     className={"p-2 hover:bg-gray-200 rounded-[50%] transition-colors"}>
                                    <AiFillEdit className={"text-lg text-gray-600"}/>
                                </div>
                            </>
                        )
                    }
                </div>

                <div className={"items-center flex justify-between rounded shadow py-6 px-4 my-4 w-[50%] mx-auto"}>
                    {
                        editState === EditState.CATEGORY ? (
                            <>
                                <select
                                    ref={categoryRef}
                                    className={"border border-blue-400 px-4 py-2"}
                                    defaultValue={formData.categoryId ? formData.categoryId : product?.category.id}
                                >
                                    {
                                        categories?.map(cat => <option selected={cat.id === Number(formData.categoryId)}
                                                                       key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>)
                                    }
                                </select>
                                <div className={"flex gap-2 text-lg"}>
                                    <div className={"p-2 rounded-[50%] hover:bg-gray-200"}>
                                        <IoCheckmarkOutline onClick={() => handleEditCategoryConfirm()}/>
                                    </div>
                                    <div className={"p-2 rounded-[50%] hover:bg-gray-200"}>
                                        <IoCloseOutline onClick={() => {
                                            setFormData(prevState => ({
                                                ...prevState,
                                                categoryId: ""
                                            }))
                                            setEditState(EditState.NONE)
                                        }}/>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <MdCategory className={"text-xl text-blue-700"}/>
                                <label
                                    className={"text-gray-600 font-semibold"}>{formData.categoryId ? categories?.find(c => c.id === Number(formData.categoryId))?.name : product?.category.name}</label>
                                <div onClick={() => setEditState(EditState.CATEGORY)}
                                     className={"p-2 hover:bg-gray-200 rounded-[50%] transition-colors"}>
                                    <AiFillEdit className={"text-lg text-gray-600"}/>
                                </div>
                            </>
                        )
                    }
                </div>

                <div
                    className={"relative items-center flex justify-between rounded shadow py-6 px-4 my-4 w-[50%] mx-auto"}>
                    {
                        formData.image ? (
                            <>
                                <img src={`data:image/jpg;base64, ${formData.image}`} alt={'Product-Image'}/>
                                <div
                                    onClick={() => imageRef?.current?.click()}
                                    className={"transition-colors shadow-md absolute rounded-[50%] bg-white p-2 right-2 top-2 hover:bg-gray-300 cursor-pointer"}>
                                    <AiFillEdit className={"text-lg text-gray-600"}/>
                                </div>
                                <div
                                    onClick={() => setFormData(prevState => ({
                                        ...prevState,
                                        image: ""
                                    }))}
                                    className={"shadow-md absolute rounded-[50%] bg-white p-2 right-2 top-12 transition-colors hover:bg-gray-300 cursor-pointer"}>
                                    <IoCloseOutline className={"text-lg text-gray-600"}/>
                                </div>
                                <input
                                    className={"hidden"}
                                    ref={imageRef}
                                    id={"image-input"}
                                    onChange={handleChooseImage}
                                    accept={".jpeg,.png,.jpg"}
                                    type={"file"}
                                />
                            </>
                        ) : (
                            <>
                                <img src={product?.image} alt={'Product-Image'}/>
                                <div
                                    onClick={() => imageRef?.current?.click()}
                                    className={"shadow-md transition-colors absolute rounded-[50%] bg-white p-2 right-2 top-2 hover:bg-gray-300 cursor-pointer"}>
                                    <AiFillEdit className={"text-lg text-gray-600"}/>
                                </div>
                                <input
                                    className={"hidden"}
                                    ref={imageRef}
                                    id={"image-input"}
                                    onChange={handleChooseImage}
                                    accept={".jpeg,.png,.jpg"}
                                    type={"file"}
                                />
                            </>
                        )
                    }
                </div>

                <div className={"w-[50%] mx-auto"} onClick={() => handleUpdateProduct()}>
                    <input value={"Update"}
                           className={"hover:bg-green-400 transition-colors cursor-pointer rounded shadow py-6 px-4 my-4 w-full bg-green-300 text-white font-bold"}
                           type={"submit"}/>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;