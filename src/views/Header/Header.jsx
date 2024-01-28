"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from "./Header.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faCartShopping, faList, faMagnifyingGlass, faBath, faBone, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import Subcategory from '../../components/Subcategory';
import { getCategories, getSubcategories } from '../../services/categoryService';

export default function Header() {
   const [categories, setCategories] = React.useState([]);
   const [subcategories, setSubcategories] = React.useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const categoriesData = await getCategories();
            const subcategoriesData = await getSubcategories();

            setCategories(categoriesData);
            setSubcategories(subcategoriesData);
         } catch (error) {
            console.error('Error fetching Categories & Subcategories:', error);
            throw error;
         }
      }

      fetchData();
   }, []);

   return (
      <div id={styles["header"]} className="fixed-top">
         <div className="container">
            <div className={styles["header-top"]}>
               <div className="row">
                  <div className="col-xl-3">
                     <div className={styles["logo"]}>
                        <Link className="d-flex align-items-center justify-content-around" href="/">
                           <img src="https://i.imgur.com/5koBfU7.png" title="Logo" />
                           <div className={`${styles["logo-content"]} d-flex flex-column align-items-center justify-content-between`}>
                              <h1 className={styles["logo-heading"]}>Pet store</h1>
                              <p className={styles["logo-slogan"]}>All for your pet</p>
                           </div>
                        </Link>
                     </div>
                  </div>

                  <div className="col-xl-4 col-xxl-5 px-4">
                     <div className={styles["header-search"]}>
                        <form action="" className={styles["header-search-form"]}>
                           <input type="text" name="search" id="search" placeholder="Bạn cần tìm gì?" className={styles["form-control"]} />
                           <Link className={styles["btn-search"]} href="#"><FontAwesomeIcon icon={faMagnifyingGlass} className={styles["search-icon"]} /></Link>
                        </form>
                     </div>
                  </div>

                  <div className="col-xl-5 col-xxl-4 py-2">
                     <div className="row">
                        <div className="col-xl-6">
                           <div className={styles["header-sales-item"]}>
                              <Link href="tel:0866211334">
                                 <div className={styles["sales-icon"]}>
                                    <FontAwesomeIcon icon={faPhone} />
                                 </div>
                                 <div className={styles["sales-content"]}>
                                    <p className={styles["sales-content-heading"]}>0866211334</p>
                                    <p className={styles["sales-content-desc"]}>Hỗ trợ & mua hàng</p>
                                 </div>
                              </Link>
                           </div>
                        </div>
                        <div className="col-xl-6">
                           <div className={styles["header-sales-item"]}>
                              <Link href="#">
                                 <div className={styles["sales-icon"]}><FontAwesomeIcon icon={faCartShopping} /></div>
                                 <div className={styles["sales-content"]}>
                                    <p className={styles["sales-content-heading"]}>
                                       <span className={styles["header-cart-quantity"]}>7</span>
                                       Sản phẩm
                                    </p>
                                    <p className={styles["sales-content-desc"]}>Giỏ hàng</p>
                                 </div>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className={styles["header-bottom"]}>
               <div className="row h-100">
                  <div className="col-xl-3 h-100">
                     <div className={styles["header-category"]}>
                        <div className={styles["category-title"]}>
                           <p className={styles["header-category-icon"]}>
                              <FontAwesomeIcon icon={faList} />
                           </p>
                           <p className={styles["header-category-desc"]}>
                              Sản phẩm & Dịch vụ
                           </p>
                        </div>
                        <div className={styles["header-categories"]}>
                           <div className={styles["header-categories-product"]}>
                              <div className={styles["categories-title"]}>
                                 <p className={styles["categories-title-icon"]}>
                                    <FontAwesomeIcon icon={faBone} />
                                 </p>
                                 <p className="categories-title-desc">
                                    Sản phẩm
                                 </p>
                              </div>
                              <ul className={styles["category-list"]}>
                                 {categories.slice(0, 7).map((category) => (
                                    <li key={category.id} className={`${styles["category-item"]}`}>
                                       {category.id !== 7 ? (
                                          <>
                                             <Link href="#" className={styles["category-item-link"]}>
                                                <span>{category.name}</span>
                                                <FontAwesomeIcon className={styles["category-item-icon"]} icon={faCaretRight} />
                                             </Link>
                                             <Subcategory subcategories={subcategories} categoryId={category.id} />
                                          </>
                                       ) : (
                                          <Link href="#" className={styles["category-item-link"]}>
                                             <span>{category.name}</span>
                                          </Link>
                                       )
                                       }
                                    </li>
                                 ))}
                              </ul>

                           </div>

                           <div className={styles["header-categories-service"]}>
                              <div className={styles["categories-title"]}>
                                 <p className={styles["categories-title-icon"]}>
                                    <FontAwesomeIcon icon={faBath} />
                                 </p>
                                 <p className="categories-title-desc">
                                    Dịch vụ
                                 </p>
                              </div>
                              <ul className={styles["category-list"]}>
                                 <li className={styles["category-item"]}>
                                    <Link href="#" className={styles["category-item-link"]}>
                                       <span>Spa - Grooming</span>
                                       <FontAwesomeIcon className={styles["category-item-icon"]} icon={faCaretRight} />
                                    </Link>
                                 </li>
                                 <li className={styles["category-item"]}>
                                    <Link href="#" className={styles["category-item-link"]}>
                                       <span>Khách sạn thú cưng</span>
                                       <FontAwesomeIcon className={styles["category-item-icon"]} icon={faCaretRight} />
                                    </Link>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-9 h-100">
                     <div className={styles["header-navbar"]}>
                        <ul className="list-unstyled d-flex w-100 mb-0 h-100">
                           <li className={styles["nav-item"]}><Link href="/" className={styles["nav-link"]}>Tra cứu đơn hàng</Link></li>
                           <li className={styles["nav-item"]}><Link href="/promotions" className={styles["nav-link"]}>Khuyến mãi</Link></li>
                           <li className={styles["nav-item"]}><Link href="/news" className={styles["nav-link"]}>Tin tức</Link></li>
                           <li className={styles["nav-item"]}><Link href="/contact" className={styles["nav-link"]}>Liên hệ</Link></li>
                           <li className={`${styles["nav-item"]} ${styles["nav-user"]}`}>
                              <div className={styles["user-content"]}>
                                 <Link className={styles["nav-link"]} href="/login">
                                    <span className={styles["user-icon"]}><FontAwesomeIcon icon={faCircleUser} /></span>
                                    <span className={styles["user-desc"]}>
                                       Đăng nhập
                                    </span>
                                 </Link>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
