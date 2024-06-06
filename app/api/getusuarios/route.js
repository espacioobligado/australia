import { NextResponse } from 'next/server';
import conn from '../../../lib/db';

export async function GET() {
    const query = 'SELECT id, nombre, lastconnection FROM usuarios'
    const result = await conn.query(query);
    const rersult2 = result.rows
    return NextResponse.json( rersult2 ) 
} 