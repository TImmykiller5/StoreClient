import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
    const response = await fetch(URL, {next: {revalidate: 0}});
    const data = await response.json();
    return data;
};

export default getColors