import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

export class CreateOrderController {
    async handle(req: Request, res: Response) {
        const { table, name } = req.body

        const createOrderService = new CreateOrderService()

        const order = await createOrderService.execute({ table, name })

        console.log(order);
        
        return res.json(order)
    }
}