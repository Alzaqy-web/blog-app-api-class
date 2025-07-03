import { Router } from "express";
import { Userontroller } from "./user.controller";
import { createUserDTO } from "./dto/create-user.dto";
import { validateBody } from "../../middlewares/validation.middleware";
import { UploaderMiddleware } from "../../middlewares/uploder.middleware";
import { JwtMiddleware } from "../../middlewares/jwt.middleware";
import { JWT_SECRET } from "../../config/env";

export class UserRouter {
  router: Router;
  userController: Userontroller;
  uploaderMiddleware: UploaderMiddleware;
  jwtMiddleware: JwtMiddleware;

  constructor() {
    this.router = Router();
    this.userController = new Userontroller();
    this.uploaderMiddleware = new UploaderMiddleware();
    this.jwtMiddleware = new JwtMiddleware();
    this.initialRoutes();
  }

  private initialRoutes = () => {
    this.router.get(
      "/",
      this.jwtMiddleware.verifyToken(JWT_SECRET!),
      this.jwtMiddleware.verifyRole(["ADMIN"]),
      this.userController.getUsers
    );
    this.router.post(
      "/",
      this.uploaderMiddleware // -> 1
        .uploud()
        .fields([{ name: "profilePic", maxCount: 1 }]),

      // -> ini wajid setelah upload // -> 2
      this.uploaderMiddleware.fileFilter([
        "image/jpeg",
        "image/png",
        "image/avif",
        "image/heic",
      ]),
      validateBody(createUserDTO),
      this.userController.createuser
    );
  };

  public getRouter = () => {
    return this.router;
  };
}
