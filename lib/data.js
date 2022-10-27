export const getSinglePost = async (id) => {
    const request = {
        "PostHashHex": `${id}`,
    }
    const { data } = await axios.post(`https://node.deso.org/api/v0/get-single-post`, request)
    if (data && data.PostFound) {
        return data.PostFound;
    }
}