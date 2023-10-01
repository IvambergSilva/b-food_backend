import prismaClient from "../../prisma"

interface OrderDetailsRequest {
    order_id: string
}

export class OrderDetailsService {
    async execute({ order_id }: OrderDetailsRequest) {
        const order = await prismaClient.item.findMany({
            where: {
                order_id: order_id
            },
            include: {
                product: true,
                order: true
            }
        })

        return order
    }
}