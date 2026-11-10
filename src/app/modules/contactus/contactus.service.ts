import { IInquiry } from "./contactus.interface";
import { inquiry } from "./contactus.model";



const createInquery = async (payload: IInquiry) => {

    const result = await inquiry.create(payload)

    return result

}


export const createInqueryService = {
    createInquery
}