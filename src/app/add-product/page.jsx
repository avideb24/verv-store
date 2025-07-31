"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { Form } from "antd";
import FormInput from "@/components/reusable/form-input";

export default function AddProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  });

  const [errors, setErrors] = useState({});

  const addProductMutation = useMutation({
    mutationFn: api.addProduct,
    onSuccess: (data) => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries(["products"]);
      router.push("/");
    },
    onError: (error) => {
      toast.error("Failed to add product. Please try again.");
      console.error("Add product error:", error);
    }
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      rating: {
        rate: 0,
        count: 0
      }
    };

    addProductMutation.mutate(productData);
  };

  const handleChange = (name) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="title">
          Add New Product
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fill in the details below to add a new product to the store.
        </p>
      </div>

      <Form layout="vertical" onSubmitCapture={handleSubmit} className="space-y-6">
        <FormInput
          label="Product Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange("title")}
          placeholder="Enter product title"
          Required
        />

        <FormInput
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange("price")}
          placeholder="0.00"
          Required
        />

        <FormInput
          label="Category"
          name="category"
          type="select"
          value={formData.category}
          onChange={handleChange("category")}
          placeholder="Select a category"
          options={[
            { value: "men's clothing", label: "Men's Clothing" },
            { value: "women's clothing", label: "Women's Clothing" },
            { value: "jewelery", label: "Jewelery" },
            { value: "electronics", label: "Electronics" },
          ]}
          Required
        />

        <FormInput
          label="Image URL"
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange("image")}
          placeholder="https://example.com/image.jpg"
          prefix={<Upload className="text-gray-400 w-5 h-5" />}
          Required
        />

        <FormInput
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange("description")}
          placeholder="Enter product description"
          Required
        />

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={addProductMutation.isPending}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {addProductMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Adding Product...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </>
            )}
          </button>
        </div>
      </Form>
    </div>
  );
}
