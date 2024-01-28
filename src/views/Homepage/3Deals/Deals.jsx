"use client"
import React, { useEffect, useState } from "react";
import styles from "./Deals.module.css";
import { getProducts } from "../../../services/productsServices";
import { getCategories } from "../../../services/categoryService";
import { getHomeProductTabs } from "../../../services/otherService";
import ProductItem from "../../../components/ProductItem/ProductItem";

const PRODUCTS_PER_SLIDE = 5;

const Deals = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [homeProductTabs, setHomeProductTabs] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTabSlides, setCurrentTabSlides] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData, homeProductTabsData] = await Promise.all([
                    getProducts(),
                    getCategories(),
                    getHomeProductTabs(),
                ]);

                setProducts(productsData);
                setCategories(categoriesData);
                setHomeProductTabs(homeProductTabsData);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            filterProductsByCategory(activeTab);
        }
    }, [products, categories, activeTab]);

    const getCategoryIdBySlug = (slug) => {
        const foundCategory = categories.find((category) => category.slug === slug);
        return foundCategory ? foundCategory.id : -1;
    };

    const filterProductsByCategory = (tabIndex) => {
        const categorySlug = homeProductTabs[tabIndex].slug;
        const filtered = products.filter((product) =>
            product.categoryIds.includes(getCategoryIdBySlug(categorySlug))
        );

        setFilteredProducts(filtered);
        setCurrentTabSlides(Math.ceil(filtered.length / PRODUCTS_PER_SLIDE));
        setCurrentSlide(0);
    };

    const handleSlideChange = (newSlide) => {
        if (newSlide >= 0 && newSlide < currentTabSlides) {
            setCurrentSlide(newSlide);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles["section-heading"]}>
                            <h2>Deal nổi bật</h2>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <ul className={styles["tabs"]}>
                            {homeProductTabs.map((tab, index) => (
                                <li
                                    key={index}
                                    className={`${styles["tab-item"]} ${activeTab === index ? styles.active : ""}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-12">
                        <div className={styles["tab-content"]}>
                            {homeProductTabs.map((_, tabIndex) => (
                                <div
                                    key={tabIndex}
                                    className={`${styles["tab-pane"]} ${activeTab === tabIndex ? styles.active : ""}`}
                                >
                                    <div className={styles["products-view-grid"]}>
                                        <div
                                            className={styles["stage"]}
                                            style={{
                                                transform: `translateX(-${currentSlide * 261}px)`,
                                                width: `${filteredProducts.length * 261}px`,
                                            }}
                                        >
                                            {filteredProducts
                                                .slice(currentSlide * PRODUCTS_PER_SLIDE, (currentSlide + 1) * PRODUCTS_PER_SLIDE)
                                                .map((product, index) => (
                                                    <div key={index} className={styles["product"]}>
                                                        <ProductItem product={product} />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    <div className={styles["nav"]}>
                                        <div
                                            className={currentSlide === 0 ? `${styles.prev} ${styles.disabled}` : styles.prev}
                                            onClick={() => handleSlideChange(currentSlide - 1)}
                                        >
                                            <img src="/assets/icons/Arrow-line-left.png" alt="Previous slide" />
                                        </div>
                                        <div
                                            className={
                                                currentSlide >= currentTabSlides - 1
                                                    ? `${styles.next} ${styles.disabled}`
                                                    : styles.next
                                            }
                                            onClick={() => handleSlideChange(currentSlide + 1)}
                                        >
                                            <img src="/assets/icons/Arrow-line-right.png" alt="Next slide" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Deals;
