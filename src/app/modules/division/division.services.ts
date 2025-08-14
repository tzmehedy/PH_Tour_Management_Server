import { IDivision } from "./division.interface"

const createDivision = async(payload: IDivision) =>{
   console.log(payload) 
    
}
export const divisionServices = {
    createDivision
}