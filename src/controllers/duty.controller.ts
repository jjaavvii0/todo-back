import { Request, Response } from "express";
// import Duty from '../models/Duty'// TODO: MODEL 


export const getDuties = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ mock: "getDuties" });
    } catch (e) {
        res.status(404).json(e);
    }
};

export const createDuty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {name, description, status} = req.body
        res.status(201).json({ mock: "createDuty" });
    } catch (e) {
        res.status(404).json(e);
    }
};

export const deleteDuty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.body;
        res.status(202).json({ mock: "deleteDuty" });
    } catch (e) {
        res.status(404).json(e);
    }
};
