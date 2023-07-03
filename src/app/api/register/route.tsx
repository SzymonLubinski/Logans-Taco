import bcrypt from "bcrypt";
import prisma from '../../libs/prismadb';
import {NextResponse} from "next/server";
import {RegisterDataTypes} from "../../../../components/models/Types";


export async function POST(request: Request){
    const body = await request.json();
    const {email, password, name}: RegisterDataTypes = body;

    if (!name || !email || !password){
        return new NextResponse('Missing property', {status: 400})
    }
    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (exist){
        throw new Error('Email is already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const rating = null;
    const user = await prisma.user.create({
        data: {
            email,
            hashedPassword,
            name,
            rating,
        }
    });
    return NextResponse.json(user);
}