import { NextResponse } from "next/server"
import conn from '../../../lib/db'

export async function POST(request){
        const res = await request.json()
        const postChat = async (data) => {
            try {
                const formData = data.nuevoChat;
        
                const { remitente, publicaciondeusuario, activo, timeCreated } = formData;

                const insertUserQuery = 'INSERT INTO chat (remitente, publicaciondeusuario, activo, timeCreated) VALUES ($1, $2, $3, $4) RETURNING id';
                const insertUserValues = [remitente, publicaciondeusuario, activo, timeCreated];
                const insertUserResult = await conn.query(insertUserQuery, insertUserValues);
                // chatId = insertUserResult.rows[0].id;
                return insertUserResult.rows[0].id;
            } catch (error) {
                console.error('Error durante la inserción del chat nuevo ultra mega cool:', error);
                throw error;
            }
        };
       
    try {
        const chatId = await postChat(res);
        return NextResponse.json({ id: chatId });
    } catch (error) {
        return NextResponse.error(error);
    }
}