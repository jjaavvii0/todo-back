import { Request, Response } from "express";
import { pool } from "../database";

export const getDuties = async (req: Request, res: Response): Promise<void> => {
    try {
        const { rows } = await pool.query("SELECT * FROM duties");
        res.status(200).json(rows);
    } catch (e) {
        res.status(500).json(e);
    }
};

export const createDuty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, description, status } = req.body;
        const { rows } = await pool.query(
            "INSERT INTO duties (name, description, status) VALUES ($1, $2, $3) RETURNING *",
            [name, description, status]
        );
        res.status(201).json(rows[0]);
    } catch (e) {
        res.status(500).json(e);
    }
};

export const deleteDuty = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.query;
        await pool.query("DELETE FROM duties WHERE id = $1", [id]);
        //TODO: Check if we deleted something
        res.status(202).json({ message: `Duty with ID:${id} was deleted successfully` });
    } catch (e) {
        res.status(500).json(e);
    }
};
