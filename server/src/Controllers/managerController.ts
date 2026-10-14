import { Request, Response } from "express"
import { prisma } from "../lib/prisma"



export const getManager = async (req: Request, res: Response): Promise<void> => {
    try {
        const cognitoId = req.params.cognitoId as string;
        if (cognitoId !== req.user?.id) {
            res.status(403).json({ message: "You can only get your own profile" })
            return
        }
        const manager = await prisma.manager.findUnique({
            where: { cognitoId },
        })
        if (manager) {
            res.json(manager);
        } else {
            res.status(404).json({ message: "Manager not found" });
        }

    } catch (error: any) {

        res.status(500).json({ message: `Error retrieving manager: ${error.message}` });
    }


}

export const createManager = async (req: Request, res: Response): Promise<void> => {

    try {

        const { cognitoId, name, email, phoneNumber } = req.body


        if (!cognitoId || !email || !name) {
            res.status(400).json({ message: "cognitoId, name and email are required" })
            return
        }

        const existing = await prisma.tenant.findUnique({ where: { cognitoId } });
        if (existing) {
            res.status(409).json({ message: "Manager already exists" });
            return;
        }

        const manager = await prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber
            }
        })
        res.status(201).json(manager);

    } catch (error: any) {
        res
            .status(500)
            .json({ message: `Error creating manager: ${error.message}` });

    }
}

