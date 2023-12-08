import { ensureDbConnect } from "@/lib/dbConnect";
import { Button, Card } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  // ensureDbConnect()
  const session = useSession()
  return (
    <div>
      {session.data && <Card style={{ width: '100wh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <div>
          <h2>{session.data.user?.name}</h2>
        </div>
        <div>
          <Button variant="contained" onClick={()=>{signOut()}}>Logout</Button>
        </div>
      </Card>}
      {!session.data && <Card style={{ width: '100wh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <div>
          <h2>AUTH APP</h2>
        </div>
        <div>
          <Button variant="contained" onClick={()=>{signIn()}}>Sigup</Button>
        </div>
      </Card>}
    </div >
  )
}
