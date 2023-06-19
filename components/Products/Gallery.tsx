import styles from './Gallery.module.css';
import Product from "./Product";
import {MealType} from "../models/Types";


const Gallery = (props: {meals: MealType[]}) => {
    return (
        <div>
            <div className={styles.galleryContainer}>
                {props.meals.map(product => (
                    <Product key={product._id}
                             _id={product._id}
                             name={product.name}
                             image={product.image}
                             ingredients={product.ingredients}
                             price={product.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default Gallery;


