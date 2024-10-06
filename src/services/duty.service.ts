import { pool } from "../database";
import { QueryResult } from "pg";

interface DutyData {
    name: string;
    description: string;
    status: boolean;
}

// Obtener todas las duties
export const getAllDuties = async (): Promise<any[]> => {
    const { rows }: QueryResult = await pool.query("SELECT * FROM duties");
    return rows;
};

// Crear una nueva duty
export const createNewDuty = async (dutyData: DutyData): Promise<any> => {
    const { name, description, status } = dutyData;
    const { rows }: QueryResult = await pool.query(
        "INSERT INTO duties (name, description, status) VALUES ($1, $2, $3) RETURNING *",
        [name, description, status]
    );
    return rows[0];
};

// Eliminar una duty por ID
export const removeDutyById = async (id: string): Promise<boolean> => {
    const result: QueryResult = await pool.query(
        "DELETE FROM duties WHERE id = $1",
        [id]
    );
    if (result && result.rowCount != null && result.rowCount > 0) {
        return true;
    }

    return false;
};

// Actualizar una duty por ID
export const updateDutyById = async (
    id: string,
    dutyData: DutyData
): Promise<any | null> => {
    const { name, description, status } = dutyData;
    const { rows }: QueryResult = await pool.query(
        "UPDATE duties SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *",
        [name, description, status, id]
    );
    return rows.length > 0 ? rows[0] : null;
};
