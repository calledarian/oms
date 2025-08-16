import { Product } from "@/app/interfaces/data";
import axios from "axios";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useProducts() {
    const [formData, setFormData] = useState<Pick<Product, "name" | "description" | "price" | "images">>({
        name: '',
        description: '',
        price: '',
        images: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    // handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // create product
    const createProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<Product>(`${BACKEND_URL}/products`, formData);
            setProducts((prev) => [...prev, response.data]); // optional: add new product to state
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    // fetch products
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Product[]>(`${BACKEND_URL}/products`);
            setProducts(response.data);
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(new Error(err.response.data.message));
            } else {
                setError(err as Error);
            }

        } finally {
            setLoading(false);
        }
    };

    const deleteProductById = async (id: number) => {
        setLoading(true);
        setError(null);

        try {
            await axios.delete(`${BACKEND_URL}/products/${id}`);
            setProducts(prev => prev.filter(product => product.id !== id));
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(new Error(err.response.data.message));
            } else {
                setError(err as Error);
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    return { formData, handleChange, createProducts, loading, error, setProducts, products, deleteProductById };
}
