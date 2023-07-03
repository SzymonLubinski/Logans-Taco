"use client";

import React, {useReducer} from "react";
import {defaultOrderType, ItemTypes, OrderContextObj, actionTypes} from "../../../components/models/Types";


export const OrderContext = React.createContext<OrderContextObj>({
    items: [],
    totalAmount: 0,
    freeDelivery: false,
    addOrder: () => {},
    removeOrder: (name: string) => {},
    clearOrder: () => {},
});

const defaultOrderState: defaultOrderType = {
    items: [],
    totalAmount: 0,
    freeDelivery: false,
}


const orderReducer = (state: defaultOrderType, action: actionTypes) => {
    // console.log('state', state)
    // console.log('action', action)
    switch (action.type) {
        case 'ADD':
            const updatedTotalAmount = state.totalAmount +
                action.payload.price * action.payload.amount;
            const isDuplicateIndex = state.items.findIndex(
                (item: ItemTypes) => item.name === action.payload.name
            );
            const isDuplicate = state.items[isDuplicateIndex];
            let updatedItems: ItemTypes[];

            if (isDuplicate) {
                const updatedItem = {
                    ...isDuplicate,
                    amount: isDuplicate.amount + action.payload.amount,
                };
                updatedItems = [...state.items];
                updatedItems[isDuplicateIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.payload);
            }

            let updatedDelivery = false;
            if (updatedTotalAmount >= 80){
                updatedDelivery = true
            }
            // console.log(updatedItems)
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
                freeDelivery: updatedDelivery,
            };

        case 'REMOVE':
            const removingIndex = state.items.findIndex(
                (item: any) => item.name === action.payload
            );
            const removing = state.items[removingIndex];
            const upTotalAmount = state.totalAmount - removing.price;
            let upItems: any;

            if (removing.amount === 1) {
                upItems = state.items.filter((item: any) => item.name !== action.payload);
            } else {
                const upItem = {...removing, amount: removing.amount - 1};
                upItems = [...state.items];
                upItems[removingIndex] = upItem;
            }

            let upDelivery = false;
            if (upTotalAmount >= 80){
                upDelivery = true
            }

            return {
                items: upItems,
                totalAmount: upTotalAmount,
                freeDelivery: upDelivery,
            }
        case 'CLEAR':
            return defaultOrderState;
    }
    return defaultOrderState;
};


const OrderContextProvider: React.FC<{
    children: React.ReactNode
}> = (props: { children: React.ReactNode }) => {
    const [orderState, dispatchOrderAction] = useReducer(
        orderReducer,
        defaultOrderState
    );

    const addItemToOrderHandler = (item: ItemTypes) => {
        dispatchOrderAction({type: 'ADD', payload: item})
    }
    const removeItemFromOrderHandler = (name:string) => {
        dispatchOrderAction({type: 'REMOVE', payload: name})
    }
    const clearOrderHandler = () => {
        dispatchOrderAction({type: 'CLEAR', payload: 'no payload'})
    }

    const contextValue: OrderContextObj = {
        items: orderState.items,
        totalAmount: orderState.totalAmount,
        freeDelivery: orderState.freeDelivery,
        addOrder: addItemToOrderHandler,
        removeOrder: removeItemFromOrderHandler,
        clearOrder: clearOrderHandler,
    }

    return (
        <OrderContext.Provider value={contextValue}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider