/**
 * 
 *      The API Agent
 * 
 */

export default async function getData() {
    try {
        const resp = await fetch(
            "http://localhost:19020/scanData/getBodyParts",
            {
                method: "GET",
                headers: {}
            }
        );
        const data = await resp.json();
        return data;
    } catch (error) {
     console.error(error);   
    }
}