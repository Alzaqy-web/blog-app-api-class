import { ApiError } from "../../utils/api.error";
import { PrismaService } from "../prisma/prisma.service";

export class userService {
  prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }
  // GET -> banyak data
  getUsers = async () => {
    return await this.prisma.user.findMany({
      omit: { password: true },
    });
  };

  // GET -> banyak data\
  getuser = async (id: number) => {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
    });
    if (!user) {
      throw new ApiError("user not found", 400);
    }
    return user;
  };
}
