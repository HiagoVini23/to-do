import { AuthenticationService } from '../middleware/authentication';
import { TaskController } from '../controller/TaskController';
import express from 'express';
const router = express.Router();
const taskController = new TaskController()
const authentication = new AuthenticationService()

// Defina as rotas para alunos neste arquivo
router.post('/create', authentication.validate, taskController.createTask );
router.get('/all/:idUser', authentication.validate, taskController.findByUser );
router.put('/update/:idUser/:idTask', authentication.validate, taskController.updateTask);
router.delete('/delete/:idUser/:idTask', authentication.validate, taskController.deleteTask);

module.exports = router;
export default router;