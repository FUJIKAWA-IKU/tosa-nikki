import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
	request: NextApiRequest,
	response: NextApiResponse,
) {
	console.log("わーーー")
	response.status(200).json({
		body: request.body,
		query: request.query,
		cookies: request.cookies,
	});
}
