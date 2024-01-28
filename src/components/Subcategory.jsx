import React from "react";
import Link from "next/link";
import styles from "../views/Header/Header.module.css"

const Subcategory = ({ subcategories, categoryId }) => {
    const filteredSubcategories = subcategories.filter((subcategory) => subcategory.categoryIds.includes(categoryId));
    
    return (
        <ul className={styles["subcategory-list"]}>
            {filteredSubcategories.map((subcategory, index) => (
                <li key={index} className={styles["subcategory-item"]}>
                    <Link href={`/ ${subcategories.slug}`} className={styles["subcategory-item-link"]}>
                        {subcategory.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Subcategory;