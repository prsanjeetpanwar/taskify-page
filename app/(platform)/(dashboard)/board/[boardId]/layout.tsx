import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/db"
import { BoardNavbar } from "./_components/board-navbar"


export async function generateMetaData({params}:{
    params:{
        boardId:string
    }

}) {

    const {orgId}=auth()

    if(!orgId){
        return {
            title:"Board"
        }
}
const board = await db.board.findUnique({
    where: {
        id: params.boardId,
        orgId
    }
});
   
    return {
        title: board?.title || "Board"
    }
}


const BoardLayout = async ({ children,
    params }: {
        children: React.ReactNode,
        params: { boardId: string }
    }) => {

    const { orgId } = auth()

    if (!orgId) {
        return redirect('/select-org')
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    if (!board) {
        notFound()
    }

    return (
        <div  
         className="relative h-full bg-cover bg-no-repeat bg-center "
        style={{backgroundImage:`url(${board.imageFullUrl})`}}>
            <main className="relative pt-28 h-screen">
                <BoardNavbar data={board}/>
                <div className="absolute bg-black/10"/>
                {children}
            </main>

        </div>
    )
}

export default BoardLayout