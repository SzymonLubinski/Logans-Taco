import { NextResponse } from 'next/server'
const nodemailer = require('nodemailer');
import clientPromise from "../../../../components/lib/mongodb";
import {ItemTypes} from "../../../../components/models/Types";


export async function POST(request: Request) {
    const data = await request.json()

    let {items, totalAmount, freeDelivery, contact} = data;

    // DATABASE
    const mongoClient = await clientPromise;
    try {
        await mongoClient.connect();
        const db = mongoClient.db('logans-taco');
        const collection = db.collection('orders');

        await collection.insertOne({
            meals: items,
            totalAmount: totalAmount,
            freeDelivery: freeDelivery,
            contact: {
                email: contact.email,
                phone: contact.phone,
                code: contact.code,
                city: contact.city,
                street: contact.street,
                apartment: contact.apartment,
            },
            isSent: false,
        })
        console.log('dodano?')
    } catch (err) {
        console.log(err);
    } finally {
        await mongoClient.close();
    }


    // EMAIL
    let mealsList = '';
    items.forEach(mealsListHandler);
    function mealsListHandler (item: ItemTypes) {
        mealsList += `
            <li style='border-bottom: 1px solid black'>
                <div style="text-align: left; margin: auto">${item.name}</div>
                <div style="text-align: right; margin: auto">
                    <div>${item.amount}x</div>
                    <div>${item.price}zł</div>
                </div>
            </li>
        `
    }
    const deliveryPrice = 7.99;
    let delivery;
    if (freeDelivery) {
        delivery = 'Darmowa dostawa!';
    } else {
        delivery = 'wliczono dostawę: '+ deliveryPrice;
        totalAmount += deliveryPrice
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'szymon.lubinski.it@gmail.com',
            pass: 'xtwtwapxlgklstwk',
        }
    });

    try {
        const mail = await transporter.sendMail({
            from: 'szymon.lubinski.it@gmail.com',
            to: contact.email,
            replyTo: contact.email,
            subject: "Zamówienie z Logan's Taco",
            html: `
                <div style="width: 60%; padding: 10px; background: #9ac142; text-align: center">
                    <h2>
                        Dziękujemy za złożenie zamówienia w Logan's Taco
                    </h2>
                    <div style="text-align: right">
                        <h3>Twoje dane kontaktowe:</h3>
                        <h4>Email: ${contact.email}</h4>
                        <h4>Telefon: ${contact.phone}</h4>
                        <h4>Adres dostawy: ${contact.code} ${contact.city}, ${contact.street} ${contact.apartment}</h4>
                    </div>
                    <div style="text-align: left">
                        <h3>Dane restauracji:</h3>
                        <h4>Logan's Taco Corporation</h4>
                        <h4>Email: szymon.lubinski.it@gmail.com</h4>
                        <h4>Telefon: 123456789</h4>
                        <h4>Adres Firmy: Rzeszów, ul. Niewiemgdzie 13/13</h4>
                    </div>
                    <h2>Twoje zamówienie:</h2>
                    <ul style="border: 2px solid black; list-style: none; padding: 10px">
                        ${mealsList}
                    </ul>
                    <div style="margin-top: 10px">${delivery}</div>
                    <div>Łączna kwota do zapłaty: ${totalAmount.toFixed(2)}</div>
                    <div>Płatność przy odbiorze</div>
                </div>
            `,
        })

        console.log('(EMAIL), message sent Success step 2: ', mail.messageId);
        return NextResponse.json({ data })
    } catch (err) {
        console.log(err);
        console.log('(EMAIL), we have a bug step 2')
        return NextResponse.json({ data })
    }
}