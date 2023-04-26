import { useWindowSize } from "usehooks-ts";
import React from "react";

export function useIsBrowser(){
    const size=useWindowSize();
    const [type,setType]=React.useState("")
    React.useEffect(()=>{
        if(size.width<640){
           return  setType('mobile')
        }else {
            return setType('desktop')
        }
    },[size])

    return {
        type,
        size
    }
}