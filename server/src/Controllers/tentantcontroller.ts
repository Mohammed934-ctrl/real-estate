import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const cognitoId = req.params.cognitoId as string;
    if (cognitoId !== req.user?.id) {
      res.status(403).json({
        message: "You can only get your own profile",
      });
      return;
    }

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        favorites: true
      }
    })
    if (tenant) {
      res.json(tenant)
    }
    else {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tenant: ${error.message}` });
  }


}

export const createTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body


    if (!cognitoId || !email || !name) {
      res.status(400).json({ message: "cognitoId, name and email are required" })
      return
    }
    const existing = await prisma.tenant.findUnique({ where: { cognitoId } });
    if (existing) {
      res.status(409).json({ message: "Tenant already exists" });
      return;
    }

    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber
      }
    })
    res.status(201).json(tenant);
  } catch (error: any) {

    res.status(500).json({ message: `Error creating tenant: ${error.message}` });

  }

}




export const updateTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cognitoId = req.params.cognitoId as string;

    if (cognitoId !== req.user?.id) {
      res.status(403).json({
        message: "You can only update your own profile",
      });
      return;
    }

    const { name, email, phoneNumber } = req.body;
    if (name !== undefined && typeof name !== "string") {
      res.status(400).json({ message: "Name must be a string" });
      return;
    }

    if (
      email !== undefined &&
      (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    if (phoneNumber !== undefined && typeof phoneNumber !== "string") {
      res.status(400).json({ message: "Phone number must be a string" });
      return;
    }

    const updatedTenantInfo = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.status(200).json(updatedTenantInfo);
  } catch (error: any) {
    res.status(500).json({
      message: `Error in updating tenant: ${error.message}`,
    });
  }
};