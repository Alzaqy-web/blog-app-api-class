import { PrismaClient } from "../../generated/prisma";

export class PrismaService extends PrismaClient {
  constructor() {
    super(); // ->  super untuk meneksekusi perents
  }
}
