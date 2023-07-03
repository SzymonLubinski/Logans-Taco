"use client";

import {useState} from "react";

import OrderContextProvider from "@/app/context/context";
import Header from "../Header/Header";
import Order from "../Order/Order";
import Menu from "../Header/Menu";
import Finish from "../Order/Finish";
import Gallery from "../Products/Gallery";
import {MealType} from "../models/Types";


export default function Main(
    props: { meals: MealType[], ratings: number[] }
) {
    const [whichPortal, setWhichPortal] = useState({
        orderPortal: false,
        menuPortal: false,
        finishPortal: false,
    });

    const onWhichPortalHandler = (which: string) => {
        switch (which) {
            case 'orderPortal':
                setWhichPortal({
                    orderPortal: true,
                    menuPortal: false,
                    finishPortal: false,
                })
                break;
            case 'menuPortal':
                setWhichPortal({
                    orderPortal: false,
                    menuPortal: true,
                    finishPortal: false,
                })
                break;
            case 'finishPortal':
                setWhichPortal({
                    orderPortal: false,
                    menuPortal: false,
                    finishPortal: true,
                })
                break;
            case 'clear':
                setWhichPortal({
                    orderPortal: false,
                    menuPortal: false,
                    finishPortal: false,
                })
                break;
            default:
                setWhichPortal({
                    orderPortal: false,
                    menuPortal: false,
                    finishPortal: false,
                })
                break;
        }
    }
    return (
        <main>
            <OrderContextProvider>
                <Header onShowOrder={onWhichPortalHandler.bind(null, 'orderPortal')}
                        onShowMenu={onWhichPortalHandler.bind(null, 'menuPortal')}
                />
                {whichPortal.orderPortal &&
                    <Order onClose={onWhichPortalHandler.bind(null, 'clear')}
                           onShow={onWhichPortalHandler.bind(null, 'finishPortal')}/>
                }
                {whichPortal.menuPortal &&
                    <Menu onClose={onWhichPortalHandler.bind(null, 'clear')}
                          ratings={props.ratings}
                    />

                }
                {whichPortal.finishPortal &&
                    <Finish onClose={onWhichPortalHandler.bind(null, 'clear')}/>
                }
                <Gallery meals={props.meals}/>
            </OrderContextProvider>
        </main>
    )
}