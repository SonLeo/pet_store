"use client"
import React, { useEffect } from "react"
import { getBannerSlides } from "../../../services/otherService"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import styles from './Slider.module.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation';
import Link from "next/link"
export default function Slider() {
    const [bannerSlides, setBannerSlides] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bannerSlidesData = await getBannerSlides();
                setBannerSlides(bannerSlidesData);
            } catch (error) {
                console.error("Error fetching Banner slides:", error);
                throw error;
            }
        }

        fetchData();
    }, []);

    return (
        <section className={`section ${styles['section-slider']}`}>
            <div className={styles["slide-container"]}>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className={styles["banner-slider"]}
                >
                    {bannerSlides.map((slide, index) => (
                        <SwiperSlide>
                            <Link key={index} href={slide.path}>
                                <img src={slide.image} alt={`Slide ${index}`} className={styles["slide"]} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper >
            </div>
        </section>
    )
}