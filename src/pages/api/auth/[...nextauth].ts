import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { Provider } from "next-auth/providers"
import CredentialsProvider  from "next-auth/providers/credentials"
import { ensureDbConnect } from "@/lib/dbConnect"
import { Admin } from "@/lib/db"
 
export const authOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentils',
            type: 'credentials',
            credentials: {
                username: { label: "username", type: 'text', placehodler: 'Enter username' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                await ensureDbConnect()
                if (!credentials) {
                    return null
                }
                const username = credentials.username;
                const password = credentials.password;
                const admin = await Admin.findOne({ username })
                if (!admin) {
                    const obj = { username, password }
                    const newAdmin = new Admin(obj)
                    let adminDb = await newAdmin.save()
                    return {
                        id: adminDb._id,
                        name: adminDb.username
                    }
                }
                else {
                    if (admin.password !== password) {
                        return null
                    }
                    else {
                        return {
                            id: admin._id,
                            name: admin.username,
                        }
                    }
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ClIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        
    ] as Provider[],
    secret: process.env.NEXT_AUTH_BIT,
    session:{
        stratergy:'jwt',
        maxAge:30*24*60*60
    },
    jwt:{
        encryption:true
    }
}

export default NextAuth(authOptions)