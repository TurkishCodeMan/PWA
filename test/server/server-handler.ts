const apiUrl = "http://localhost:3000/api"
import { rest } from 'msw'


export const handlers = [
    rest.put(`${apiUrl}/task/task-groups`,async (req,res,ctx)=>{
        console.log('BURADA')
        const {targetId} =await req.json();
        console.log('--')
        return  targetId;
        
    })
]