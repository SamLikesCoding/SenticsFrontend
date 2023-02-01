import styles from "./ImageViewer.module.css";
import React, { useState } from 'react';
import Image from "next/image";
import { ArrowForward, ArrowBack } from '@mui/icons-material';

export default function ImageViewer({ imgs }) {

    // Pointers
    const [currentImage, setCurrentImage] = useState(0);
    const length = imgs.length;

    // Methods
    const prev = () => setCurrentImage(currentImage === 0 ? length - 1 : currentImage - 1);
    const next = () => setCurrentImage(currentImage === length - 1 ? 0 : currentImage + 1);

    // The Widget
    return (
     <section className={styles.slider}>
        <ArrowBack className={styles.leftArrow} onClick={prev}/>
        <ArrowForward className={styles.rightArrow} onClick={next} />
        {
            imgs.map((imageURL, idx) => {
                console.log(imageURL);
                return (<div key={idx} className={idx == currentImage? styles.slideActive : styles.slide}>
                    {idx == currentImage && (<img src={imageURL} className={styles.image}/>)}
                </div>);
            })
        }
     </section>   
    )
}

