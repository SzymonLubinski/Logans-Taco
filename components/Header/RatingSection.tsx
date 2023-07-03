'use client'
import {FaStar} from "react-icons/fa";
import {useState} from "react";
import {useRouter} from "next/navigation";
import SlidingButton from "../UI/SlidingButton";
import styles from './RS.module.css';
import {useSession} from "next-auth/react";

const colors = {
    gold: '#edd72f',
    grey: '#eae2e2',
}

export default function RatingSection(
    props: {ratings: number[]}
) {
    const {data: session} = useSession();
    const router = useRouter();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [showForm, setShowForm] = useState(true);

    const clickHandler = (value: number) => {
        setRating(value);
    }
    const mouseOverHandler = (value: number) => {
        setHover(value);
    }
    const mouseLeaveHandler = () => {
        setHover(0)
    }

    const sendRating = async (e: Event) => {
        e.preventDefault();
        const response = await fetch('/api/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail: session?.user?.email,
                rating: rating,
            }),
        });
        if (response.ok) {
            console.log('(RATING), successfully step 1!');
            setShowForm(false);
            router.refresh();

        }
        if (!response.ok) {
            console.log('(RATING), we have a bug step 1');
        }
    }
    const sum = props.ratings.reduce((a: number, b: number) => a + b, 0);
    const average = Math.round(sum / props.ratings.length);
    return (
        <section className={styles.starRating}>
            <h1>Ocena</h1>
            <h3>Ocena użytkowników:</h3>
            {Array(5).fill(0).map((star, i) => {
                return <FaStar key={i}
                               size={42}
                               color={average > i ? colors.gold : colors.grey}
                />
            })}
            {showForm &&
            <>
                <h3>Zostaw swoją ocenę!</h3>
                {Array(5).fill(0).map((star, i) => {
                    return <FaStar key={i}
                                   size={32}
                                   style={{
                                       cursor: 'pointer'
                                   }}
                                   color={(hover || rating) > i ? colors.gold : colors.grey}
                                   onClick={() => clickHandler(i + 1)}
                                   onMouseOver={() => mouseOverHandler(i + 1)}
                                   onMouseLeave={mouseLeaveHandler}
                    />
                })}
                <div className={styles.btn}>
                    <SlidingButton clickHandler={sendRating}
                                   detailsText={'Prześlij'}
                    />
                </div>
            </>}
            {!showForm &&
                <h3>dziękujemy za przesłanie oceny</h3>}
        </section>
    )
}