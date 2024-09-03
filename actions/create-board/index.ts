"use server"

import { auth } from "@clerk/nextjs/server"
import { InputType, ReturnType } from "./type"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateBoard } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: "You must be signed in to create a board"
        };
    }
    const { title, image } = data;

    const [
        imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName
    ] = image.split("|")



    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: "Missing fields. Failed to  create board."

        }

    }

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName,
            }
        });

    } catch (err) {
        return {
            error: "database error"
        }

    }
    revalidatePath(`/board/${board.id}`);
    return { data: board }
};

export const CreateBoards = createSafeAction(CreateBoard, handler);



