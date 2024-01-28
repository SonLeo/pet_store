import Link from "next/link"
import styles from "./ProductItem.module.css"
import { formatCurrency } from "../../utils/commonUtils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartPlus, faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"
import ProductRating from "../ProductRating/ProductRating"

export default function ProductItem({ product }) {
    return (
        <div className={styles["product-item"]}>
            <Link className={styles["product-link"]} href={product.link} title={product.productName}>
                <div className={styles["product-img"]}>
                    <img src={product.image} alt={product.productName} />
                </div>
                <h4 className={styles["product-name"]}>{product.productName}</h4>
                <div className={styles["product-price"]}>
                    <span className={styles["price-old"]}>{product.price_old && formatCurrency(product.price_old)}</span>
                    <span style={product.price_old ? { marginLeft: "10px" } : {}} className={styles["price-new"]}>{product.price_new && formatCurrency(product.price_new)}</span>
                </div>
                <div className={styles["product-action"]}>
                    <span className={styles["product-liked"]}>
                        {product.like ? (
                            <FontAwesomeIcon icon={fasHeart} /> 
                        ) : (
                            <FontAwesomeIcon icon={farHeart} />
                        )}
                        <ProductRating product={product} />
                        <div className={styles["product-sold"]}>{product.sold} đã bán</div>
                    </span>
                </div>
            </Link>

            <div className={styles["button-block"]}>
                <button
                    className={`${styles["btn-add-Cart"]} ${styles["btn"]}`}
                >
                    Thêm
                    <div className={styles["add-cart-icon"]}>
                        <FontAwesomeIcon icon={faCartPlus} />
                    </div>
                </button>
                <button
                    className={`${styles["btn-buy"]} ${styles["btn"]}`}
                >
                    Mua ngay
                </button>
            </div>
        </div>
    )
}