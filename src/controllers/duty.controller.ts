import { Request, Response } from "express";
import {
    getAllDuties,
    createNewDuty,
    removeDutyById,
    updateDutyById,
} from "../services/duty.service";

export const getDuties = async (req: Request, res: Response): Promise<void> => {
    try {
        const duties = await getAllDuties();
        if (duties.length > 0) {
            res.status(200).json(duties);
        } else {
            res.status(404).json({ message: "No duties found" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error retrieving duties" });
    }
};

export const createDuty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, description, status } = req.body;
        const duty = await createNewDuty({ name, description, status });
        res.status(201).json(duty);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error creating duty" });
    }
};

export const deleteDuty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await removeDutyById(id);
        if (result) {
            res.status(202).json({
                message: `Duty with ID:${id} was deleted successfully`,
            });
        } else {
            res.status(404).json({ message: `Duty with ID:${id} not found` });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error deleting duty" });
    }
};

export const updateDuty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;
        const updatedDuty = await updateDutyById(id, {
            name,
            description,
            status,
        });

        if (updatedDuty) {
            res.status(200).json(updatedDuty);
        } else {
            res.status(404).json({ message: `Duty with ID:${id} not found` });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error updating duty" });
    }
};
