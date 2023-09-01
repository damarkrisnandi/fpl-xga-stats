import { API_URL } from "../../../utils/index.js";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    
    fetch(`${API_URL}${req.url}${req.url?.includes('?') ? '' : '/'}`).then(data => {
        data.json().then(data => {
            // createResponseBody(res, data);
            res.json({ ...data });
            // return res.send({});
        })
    })
    
}