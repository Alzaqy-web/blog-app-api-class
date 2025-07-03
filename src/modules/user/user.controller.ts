import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

export class Userontroller {
  userService: userService;

  constructor() {
    this.userService = new userService();
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getUsers();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  getuser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.userService.getuser(id);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  createuser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as { [filedname: string]: Express.Multer.File[] };
      const image = files?.profilePic?.[0];
      const result = await this.userService.createUser(req.body, image);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}
