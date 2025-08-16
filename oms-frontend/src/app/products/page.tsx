'use client'
import ProductCreateForm from "./_partials/ProductCreateForm";
import ProductList from "./_partials/ProductList";

export default function Products() {
    return (
        <div>
            <ProductCreateForm />
            <ProductList />
        </div>
    );
}