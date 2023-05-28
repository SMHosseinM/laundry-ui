import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res:NextApiResponse<any>) {
    if (req.method === 'POST') {
        const postcode = req.body.postcode;
        const url = `https://api.easypostcodes.com/addresses/${postcode}`;
        await axios({
            method: 'get',
            url: `https://api.easypostcodes.com/addresses/${postcode}`,
            headers: {
                'Content-Type': 'application/json',
                'Key': process.env.APIKEY
            }
        }).then(response => res.status(200).json(response.data), error => res.status(500).json(error))
    };
}