export default async function handler(req, res) {
    if (req.method === 'POST') {
        const postcode = req.body.postcode;
        const url = `https://api.easypostcodes.com/addresses/${postcode}`;
        let result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Key': process.env.APIKEY
            }
        });

        return res.status(200).json(await result.json());
    }
}