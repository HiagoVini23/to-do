import { prisma } from '../../prisma/client';
import { TypeErrorsEnum } from 'enum/TypeErrorsEnum';
import { task } from '@prisma/client'

export class TaskService {

    async findAll(idUser: number) {
        try {
          const userTasks = await prisma.task.findMany({ 
            where: {
                user_id: idUser
            }
          });
          return { ok: true, message: "Found successfully!", data: userTasks };
        } catch (error) {
               return {ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal};
        }
    }

    async create(task: task) {
        try {
          const createdTask = await prisma.task.create({ data: task });
          return { ok: true, message: "Created successfully!", data: createdTask };
        } catch (error) {
               return {ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal};
        }
    }

    async update(task: task, userId: number, taskId: number) {
        try {
          const updatedTask = await prisma.task.update({
            where: {
                id_user_id:{
                    id: taskId,
                    user_id: userId,
                }
              },
            data: task,
          });
          return { ok: true, message: "Updated successfully!", data: updatedTask };
        } catch (error) {
          return {ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal};
        }
    }

    async delete(taskId: number, userId: number) {
        try {
          const deletedTask = await prisma.task.delete({
            where: {
                id_user_id:{
                    id: taskId,
                    user_id: userId,
                }
              }
          });
          return { ok: true, message: "Deleted successfully!", data: deletedTask };
        } catch (error) {
          return {ok: false, message: "Internal error!", data: TypeErrorsEnum.Internal};
        }
      }


}