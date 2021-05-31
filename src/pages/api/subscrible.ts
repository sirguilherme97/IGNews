import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../services/stripe'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        const checkOutSession = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            billing_address_collection: 'required',
            line_items: [
                {price:'price_1Iv3L3IWLePIgwEoo7tBDLGg', quantity:1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: 'http://localhost:3000/posts',
            cancel_url: 'http://localhost:3000'
        })
    }else{
        res.setHeader('Allow', "POST")
        res.status(405).end('Method not allowed')
    }
}