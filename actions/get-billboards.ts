import { BillBoard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id:string): Promise<BillBoard> => {
    const response = await fetch(`${URL}/${id}`, {next: {revalidate: 0}});
    const data = await response.json();
    return data;
};

export default getBillboard