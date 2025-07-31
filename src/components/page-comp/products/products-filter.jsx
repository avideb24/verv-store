"use client";

import { Search, SortAsc, SortDesc } from "lucide-react";
import React from "react";
import { Form } from "antd";
import FormInput from "@/components/reusable/form-input";

const ProductsFilter = ({
    searchTerm,
    setSearchTerm,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
}) => {
    return (
        <Form layout="vertical" className="w-full">
            <div className="md:flex md:flex-row items-center gap-4 mb-3">

                {/* Search Bar */}
                <div className="md:flex-1 relative mb-3 md:mb-0">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                    <FormInput
                        name="search"
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={setSearchTerm}
                        className="w-full pl-10"
                    />
                </div>

                <div className="flex gap-4 items-center">

                    {/* Category Filter */}
                    <FormInput
                        name="category"
                        type="select"
                        placeholder="Select category"
                        value={selectedCategory}
                        onChange={(value) => setSelectedCategory(value)}
                        options={[
                            { value: "all", label: "All Categories" },
                            ...categories?.map((category) => ({
                                value: category,
                                label: category.charAt(0).toUpperCase() + category.slice(1),
                            }))
                        ]}
                        className="!w-40"
                    />

                    {/* Sort Options */}
                    <FormInput
                        name="sortBy"
                        type="select"
                        placeholder="Sort by"
                        value={sortBy}
                        onChange={(value) => setSortBy(value)}
                        options={[
                            { value: "name", label: "Name" },
                            { value: "price", label: "Price" },
                            { value: "rating", label: "Rating" },
                        ]}
                        className="!w-28"
                    />
                    <button
                        type="button"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="p-2 text-dark dark:text-light border  rounded-lg"
                    >
                        {sortOrder === "asc" ? (
                            <SortAsc className="w-4 h-4" />
                        ) : (
                            <SortDesc className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default ProductsFilter;






// "use client";

// import { Search, SortAsc, SortDesc } from "lucide-react";
// import React from "react";


// const ProductsFilter = ({ searchTerm, setSearchTerm, categories, selectedCategory, setSelectedCategory, sortBy, setSortBy, sortOrder, setSortOrder }) => {

//     return (
//         <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
//             {/* Search Bar */}
//             <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                 />
//             </div>

//             {/* Filters Row */}
//             <div className="flex flex-wrap gap-4 items-center">
//                 {/* Category Filter */}
//                 <div className="flex items-center space-x-2">
//                     <select
//                         value={selectedCategory}
//                         onChange={(e) => setSelectedCategory(e.target.value)}
//                         className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                     >
//                         <option value="">All Categories</option>
//                         {categories?.map((category) => (
//                             <option key={category} value={category}>
//                                 {category.charAt(0).toUpperCase() + category.slice(1)}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Sort Options */}
//                 <div className="flex items-center gap-2">
//                     <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                     >
//                         <option value="name">Name</option>
//                         <option value="price">Price</option>
//                         <option value="rating">Rating</option>
//                     </select>
//                     <button
//                         onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//                         className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                     >
//                         {sortOrder === 'asc' ? (
//                             <SortAsc className="w-4 h-4" />
//                         ) : (
//                             <SortDesc className="w-4 h-4" />
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductsFilter;