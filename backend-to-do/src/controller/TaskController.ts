import { Request, Response } from 'express';
import { TaskService } from 'service/TaskService';
const taskService = new TaskService();
import { getStatusResponseError } from '../utils/ErrorsHandling';

export class TaskController {

    async findByUser(req: Request, res: Response) {
        const response = await taskService.findAll(Number(req.params.idUser));
        if (response.ok)
            return res.status(200).send(response.data)
        else {
            const status = getStatusResponseError(response)
            return res.status(status).send(response)
        }
    }

    async createTask(req: Request, res: Response): Promise<any> {
        const response = await taskService.create(req.body);
        if (response.ok)
            return res.status(200).send(response)
        else {
            const status = getStatusResponseError(response)
            return res.status(status).send(response)
        }
    }

    async updateTask(req: Request, res: Response): Promise<any> {
        const response = await taskService.update(req.body, Number(req.params.idUser), Number(req.params.idTask));
        if (response.ok)
            return res.status(200).send(response)
        else {
            const status = getStatusResponseError(response)
            return res.status(status).send(response)
        }
    }

    async deleteTask(req: Request, res: Response) {
        const response = await taskService.delete(Number(req.params.idUser), Number(req.params.idTask));
        if (response.ok)
            return res.status(200).send(response)
        else {
            const status = getStatusResponseError(response)
            return res.status(status).send(response)
        }
    }

}
