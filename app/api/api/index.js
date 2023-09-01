import { API_URL } from "@/utils";
// import { NextApiRequest, NextApiResponse } from "next";

export default function (req, res) {
    console.log(req.url);
    fetch(`${API_URL}${location.pathname}`).then(data => {
        data.json().then(data => {
            res.json({ status: 'ok', data });
        })
    })
    
}