import { User } from "../../generated/prisma";
import { ApiError } from "../../utils/api.error";
import { PasswordService } from "../auth/password.service";
import { CloudinariService } from "../cloudinary/cloudinary.service";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";

export class userService {
  private prisma: PrismaService;
  private cloudinariService: CloudinariService;
  private mailService: MailService;
  private passwordService: PasswordService;

  constructor() {
    this.prisma = new PrismaService();
    this.cloudinariService = new CloudinariService();
    this.mailService = new MailService();
    this.passwordService = new PasswordService();
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

  createUser = async (body: User, image: Express.Multer.File) => {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });

    if (user) {
      throw new ApiError("email already ", 400);
    }

    // -> uoload dulu
    if (image) {
      const { secure_url } = await this.cloudinariService.upload(image);
      body.profilePic = secure_url;
    }

    const hashPassword = await this.passwordService.hashPassword(body.password);

    const newUser = await this.prisma.user.create({
      data: { ...body, password: hashPassword },
      omit: { password: true },
    });
    // to en subject
    await this.mailService.sendEmail(body.email, "Selamat datang!", "Welcome", {
      name: newUser.name,
    });

    return newUser;
  };
}
