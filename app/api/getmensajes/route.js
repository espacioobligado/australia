import { NextResponse } from 'next/server';
import conn from '../../../lib/db';

export async function GET() {
    const query = 'SELECT * FROM mensajes'
    const result = await conn.query(query);
    const rersult2 = result.rows
    return NextResponse.json( rersult2 ) 
} 