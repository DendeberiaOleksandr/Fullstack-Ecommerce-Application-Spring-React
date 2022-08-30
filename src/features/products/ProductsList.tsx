import React, {useEffect} from 'react';
import DatePicker from "react-datepicker"
import {FaCalendarAlt} from "react-icons/fa";
import "./ProductsList.css"
import {
    setCategoryId,
    setCreatedFrom,
    setCreatedTo,
    setDirection,
    setMaxPrice,
    setMinPrice,
    setName, setPage, setSize,
    setSort
} from "./productsSearchSlice";
import {AiFillDelete, AiFillDollarCircle, AiOutlineSearch} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useGetCategoriesQuery} from "../categories/categoriesApiSlice";
import {createFilterQuery, createSortQuery} from "../../service/rsql";
import {IoAddOutline} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useDeleteProductByIdMutation, useLazyGetProductsQuery} from "./productsApiSlice";
import {BiCategoryAlt} from "react-icons/bi";
import {toast} from "react-toastify";
import ReactPaginate from "react-paginate";

function ProductsList() {

    const sortAttributes = [
        {
            value: "id",
            name: "Id"
        },
        {
            value: "name",
            name: "Name"
        },
        {
            value: "price",
            name: "Price"
        },
        {
            value: "category.id",
            name: "Category"
        },
        {
            value: "createdAt",
            name: "Adding date"
        },
    ]

    const sortDirections = [
        {
            value: "asc",
            name: "Ascending"
        },
        {
            value: "desc",
            name: "Descending"
        },
    ]

    const sizes = [
        5, 15, 20, 50
    ]

    const [trigger, result, lastPromiseInfo] = useLazyGetProductsQuery()
    const {data: categories, isLoading: isCategoriesLoading} = useGetCategoriesQuery()
    const [deleteProductById] = useDeleteProductByIdMutation()

    const search = useAppSelector(state => state.productsSearch.search)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    function handleSearchClick() {
        trigger({
            sort: createSortQuery(search.sort, search.direction),
            filter: createFilterQuery(
                search.name,
                search.minPrice,
                search.maxPrice,
                search.createdFrom,
                search.createdTo,
                search.categoryId
            ),
            size: search.size,
            page: search.page
        })
    }

    useEffect(() => {
        handleSearchClick()
    }, [])

    useEffect(() => {
        handleSearchClick()
    }, [search.page, search.size])

    if (isCategoriesLoading) {
        return <div>Loading...</div>
    }

    return (
        <div
            className={"flex flex-col w-[80%] mx-auto mt-4"}
        >
            <div className={"flex justify-between items-center bg-blue-400 shadow-md mb-4 px-8 py-4 flex-wrap"}>
                <div
                    className={"items-start gap-2 flex justify-center"}
                >
                    <div>
                        <input
                            type={"text"}
                            value={search.name}
                            onChange={e => dispatch(setName(e.target.value))}
                            placeholder={"Product name"}
                            className={"px-4 py-2 shadow-md"}
                        />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"flex items-center"}>
                            <AiFillDollarCircle className={"text-2xl text-white mr-2"}/>
                            <input
                                pattern={"^[1-9][0-9]*$"}
                                value={search.minPrice}
                                onChange={e => (e.target.validity.valid && dispatch(setMinPrice(e.target.value)))}
                                type={"text"}
                                placeholder={"Min"}
                                className={"px-4 py-2 shadow-md"}
                            />
                        </div>
                        <div className={"flex items-center"}>
                            <AiFillDollarCircle className={"text-2xl text-white mr-2"}/>
                            <input
                                pattern={"^[1-9][0-9]*$"}
                                value={search.maxPrice}
                                onChange={e => (e.target.validity.valid && dispatch(setMaxPrice(e.target.value)))}
                                type={"text"}
                                placeholder={"Max"}
                                className={"px-4 py-2 shadow-md"}
                            />
                        </div>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"flex items-center"}>
                            <FaCalendarAlt className={"text-2xl text-white mr-2"}/>
                            <DatePicker
                                selected={search.createdFrom}
                                placeholderText={"From"}
                                className={"px-4 py-2 shadow-md"}
                                onChange={(date: Date) => dispatch(setCreatedFrom(date))}
                            />
                        </div>
                        <div className={"flex items-center"}>
                            <FaCalendarAlt className={"text-2xl text-white mr-2"}/>
                            <DatePicker
                                selected={search.createdTo}
                                placeholderText={"To"}
                                className={"px-4 py-2 shadow-md"}
                                onChange={(date: Date) => dispatch(setCreatedTo(date))}
                            />
                        </div>
                    </div>
                    <div>
                        <select
                            value={search.categoryId}
                            onChange={e => dispatch(setCategoryId(e.target.value))}
                            style={{
                                appearance: "none"
                            }} className={"text-gray-500 px-4 py-2 shadow-md"}>
                            <option selected value={""}>Category</option>
                            {
                                categories?.map(category => (
                                    <option selected={category.id === search.categoryId} key={category.id}
                                            value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={"flex gap-2"}>
                        <select
                            value={search.sort}
                            onChange={e => dispatch(setSort(e.target.value))}
                            style={{
                                appearance: "none"
                            }} className={"text-gray-500 px-4 py-2 shadow-md"}>
                            {
                                sortAttributes.map(sa => (
                                    <option selected={sa.value === search.sort} key={sa.value} value={sa.value}>
                                        {sa.name}
                                    </option>
                                ))
                            }
                        </select>
                        <select
                            value={search.direction}
                            onChange={event => dispatch(setDirection(event.target.value))}
                            style={{
                                appearance: "none"
                            }} className={"text-gray-500 px-4 py-2 shadow-md"}>
                            {
                                sortDirections.map(sd => (
                                    <option selected={sd.value === search.direction} key={sd.value} value={sd.value}>
                                        {sd.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className={"cursor-pointer text-blue-400 px-4 py-2 rounded text-3xl bg-white shadow-md"}
                     onClick={() => handleSearchClick()}>
                    <AiOutlineSearch
                    />
                </div>
                <div
                    onClick={() => navigate("/new")}
                    className={"cursor-pointer text-blue-400 px-4 py-2 rounded text-3xl text-blue-400 bg-white shadow-md"}>
                    <IoAddOutline/>
                </div>
            </div>

            <div className={"mb-4"}>
                <select
                    value={search.size}
                    onChange={event => dispatch(setSize(Number(event.target.value) ?? 10))}
                    className={"text-gray-500 px-4 py-2 shadow-md"}>
                    {
                        sizes.map(sz => (
                            <option selected={sz === search.size} key={`${sz}-Size`} value={sz}>
                                {sz}
                            </option>
                        ))
                    }
                </select>
            </div>

            {
                result.isLoading && <div>Loading...</div>
            }

            {
                (result.isSuccess && !result.currentData?.empty) && (
                    <div>
                        <div className={"flex flex-wrap gap-4"}>
                            {
                                result.currentData?.content.map(product => (
                                    <div key={product.id}
                                         className={"rounded-[10px] shadow-md items-center flex flex-col"}>
                                        <div onClick={() => navigate(`/details/${product.id}`)} className={"cursor-pointer w-[220px]"}>
                                            <img className={"rounded-t-[10px]"} alt={`${product.id}Image`}
                                                 src={product.image}/>
                                        </div>
                                        <div className={"px-4 py-2 flex flex-col bg-white rounded-[10px] w-full"}>
                                            <div onClick={() => navigate(`/details/${product.id}`)} className={"cursor-pointer py-2 text-center border-b border-gray-200"}>
                                                <h1 className={"text-gray-700 text-lg font-semibold"}>{product.name}</h1>
                                            </div>
                                            <div onClick={() => navigate(`/details/${product.id}`)} className={"cursor-pointer flex items-center gap-2"}>
                                                <AiFillDollarCircle className={"text-xl text-blue-700"}/> <label
                                                className={"text-gray-600 italic"}>{product.price}</label>
                                            </div>
                                            <div onClick={() => navigate(`/details/${product.id}`)} className={"cursor-pointer flex items-center gap-2"}>
                                                <BiCategoryAlt className={"text-xl text-blue-700"}/> <label
                                                className={"text-gray-600 italic"}>{product.category.name}</label>
                                            </div>
                                            <div className={"py-4 border-t border-gray-200"}>
                                                <AiFillDelete onClick={() => {
                                                    deleteProductById(product.id).unwrap()
                                                        .then(() => toast.success("Product deleted!"))
                                                        .catch(() => toast.error("Failed to delete product!"))
                                                }}
                                                              className={"cursor-pointer transition-colors hover:text-red-500 text-red-600 text-xl"}/>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={"mt-6"}>
                            <ReactPaginate
                                forcePage={search.page}
                                onPageChange={selectedItem => {
                                    dispatch(setPage(selectedItem.selected))
                                }}
                                className={"rounded shadow-md flex w-full justify-center bg-blue-400 py-2 px-4 text-white gap-4"}
                                pageCount={result.currentData?.totalPages ?? 0}
                                nextLabel={">"}
                                previousLabel={"<"}
                            />
                        </div>

                    </div>
                )
            }

        </div>
    );
}

export default ProductsList;