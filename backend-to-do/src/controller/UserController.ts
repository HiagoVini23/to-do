import { Request, Response } from 'express';
import { getStatusResponseError } from '../utils/ErrorsHandling';
import { UserService } from 'service/UserService';
const userService = new UserService();
const jwt = require("jsonwebtoken");

export class UserController {
    async createUser(req: Request, res: Response) {
        const response = await userService.create(req.body);
        if (response.ok)
            return res.status(200).send(response)
        else {
            const status = getStatusResponseError(response)
            return res.status(status).send(response)
        }
    }

    async login(req: Request, res: Response) {
        //desestruturacao
        const { email, password } = req.body;
        const response = await userService.findToLogin(email, password);
        if (response.ok) {
            const payload = {
                userEmail: email,
                expiresIn: 10800, // expires in 3h
            }
          const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET); 
          return res.status(200).json({
            token: token,
            data: response.data
          });
        }
        const status = getStatusResponseError(response)
        return res.status(status).json({ message: "Login failed!" });
      }
}
