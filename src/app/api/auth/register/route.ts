import connectToDB from "@/database/database";
import User from "@/model/userModel"; 

export const POST = async (req: Request, res: Response) => {
    // try{
    //     await connectToDB();

    //     const data = req.body;
    //     console.log(data)
    // }
    // catch(e){
    //     console.log(e);
    // }
    const {username} = await req.json()
    console.log("username", username)
}