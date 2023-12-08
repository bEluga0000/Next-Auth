import { Button, Card } from "@mui/material";
import { signIn, signOut} from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ensureDbConnect } from "@/lib/dbConnect";

export default function SsrAuth({session})
{
    ensureDbConnect()
    return (
        <div>
            {session.user && <Card style={{ width: '100wh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <div>
                    <h2>{session.user?.name}</h2>
                </div>
                <div>
                    <Button variant="contained" onClick={() => { signOut() }}>Logout</Button>
                </div>
            </Card>}
            {!session.user && <Card style={{ width: '100wh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                <div>
                    <h2>AUTH APP</h2>
                </div>
                <div>
                    <Button variant="contained" onClick={() => { signIn() }}>Sigup</Button>
                </div>
            </Card>}
        </div >
    )
}


export async function getServerSideProps(context)
{
    const session = await getServerSession(context.req,context.res,authOptions)

    if(!session)
    {
        return {
            redirect:{
                destination:'/',
                permanent:false,
            }
        }
    }
    else
    {
        return {props:{
            session,
        }}
    }
}