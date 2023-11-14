import { renderHook } from "@testing-library/react"
import { useCoordinate } from "./useCoordinate"

test('Use Coordinate Test',()=>{
    const {result} = renderHook(()=>useCoordinate())
    console.log(result)

})