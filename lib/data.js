import { NODE_API } from "./constants";

export const getSinglePost = async (id) => {
    const request = {
        "PostHashHex": `${id}`,
    }
    const { data } = await axios.post(`${NODE_API}/get-single-post`, request)
    if (data && data.PostFound) {
        return data.PostFound;
    }
}