import { Router } from "express";
import { Userontroller } from "./user.controller";

export class UserRouter {
  router: Router;
  userController: Userontroller;

  constructor() {
    this.router = Router();
    this.userController = new Userontroller();
    this.initialRoutes();
  }

  private initialRoutes = () => {
    this.router.get("/", this.userController.getUsers);
    this.router.get("/:id", this.userController.getuser);
  };

  public getRouter = () => {
    return this.router;
  };
}
