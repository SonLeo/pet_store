export const formatCurrency = (amount) => {
    if (isNaN(amount) || amount === undefined) {
        return amount;
    }
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export const API_URLS = {
    USERS: "http://localhost:3001/api/users",
    CARTS: "http://localhost:3001/api/carts",
    ORDERS: "http://localhost:3001/api/orders",
    PRODUCTS: "http://localhost:3001/api/products",
    POSTS: "http://localhost:3001/api/posts",
    CATEGORIES: "http://localhost:3001/api/categories",
    SUBCATEGORIES: "http://localhost:3001/api/subcategories",
    BRANDS: "http://localhost:3001/api/brands",
    VARIANTS: "http://localhost:3001/api/variants",
    BANNERSLIDES: "http://localhost:3001/api/bannerSlides",
    BANNERPRODUCTS: "http://localhost:3001/api/bannerProduct",
    HOMEPRODUCTTABS: "http://localhost:3001/api/homeProductTabs",
}