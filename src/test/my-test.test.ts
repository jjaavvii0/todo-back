import { Request, Response } from "express";
import {
    getDuties,
    createDuty,
    deleteDuty,
    updateDuty,
} from "../controllers/duty.controller";
import * as dutyService from "../services/duty.service";

jest.mock("../services/duty.service");

describe("Duty Controller Tests", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn(() => ({ json: jsonMock }));

        mockReq = {};
        mockRes = {
            status: statusMock,
            json: jsonMock,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getDuties", () => {
        it("should return duties when duties exist", async () => {
            (dutyService.getAllDuties as jest.Mock).mockResolvedValueOnce([
                {
                    id: 1,
                    name: "Duty 1",
                    description: "Description 1",
                    status: true,
                },
            ]);

            await getDuties(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith([
                {
                    id: 1,
                    name: "Duty 1",
                    description: "Description 1",
                    status: true,
                },
            ]);
        });

        it("should return 404 when no duties are found", async () => {
            (dutyService.getAllDuties as jest.Mock).mockResolvedValueOnce([]);

            await getDuties(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "No duties found",
            });
        });

        it("should return 500 when an error occurs", async () => {
            (dutyService.getAllDuties as jest.Mock).mockRejectedValueOnce(
                new Error("Database error")
            );

            await getDuties(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Error retrieving duties",
            });
        });
    });

    describe("createDuty", () => {
        it("should create a new duty and return it", async () => {
            mockReq = {
                body: {
                    name: "New Duty",
                    description: "A new duty",
                    status: true,
                },
            };

            const newDuty = {
                id: 2,
                name: "New Duty",
                description: "A new duty",
                status: true,
            };
            (dutyService.createNewDuty as jest.Mock).mockResolvedValueOnce(
                newDuty
            );

            await createDuty(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(newDuty);
        });

        it("should return 500 when an error occurs during creation", async () => {
            mockReq = {
                body: {
                    name: "New Duty",
                    description: "A new duty",
                    status: true,
                },
            };
            (dutyService.createNewDuty as jest.Mock).mockRejectedValueOnce(
                new Error("Database error")
            );

            await createDuty(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Error creating duty",
            });
        });
    });

    describe("deleteDuty", () => {
        it("should delete a duty and return 202", async () => {
            mockReq = { params: { id: "1" } };

            (dutyService.removeDutyById as jest.Mock).mockResolvedValueOnce(
                true
            );

            await deleteDuty(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(202);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Duty with ID:1 was deleted successfully",
            });
        });

        it("should return 404 when the duty is not found", async () => {
            mockReq = { params: { id: "1" } };

            (dutyService.removeDutyById as jest.Mock).mockResolvedValueOnce(
                false
            );

            await deleteDuty(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Duty with ID:1 not found",
            });
        });

        it("should return 500 when an error occurs during deletion", async () => {
            mockReq = { params: { id: "1" } };
            (dutyService.removeDutyById as jest.Mock).mockRejectedValueOnce(
                new Error("Database error")
            );

            await deleteDuty(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Error deleting duty",
            });
        });
    });

    describe("updateDuty", () => {
        it("should update a duty and return it", async () => {
            mockReq = {
                params: { id: "1" },
                body: {
                    name: "Updated Duty",
                    description: "Updated description",
                    status: true,
                },
            };

            const updatedDuty = {
                id: 1,
                name: "Updated Duty",
                description: "Updated description",
                status: true,
            };
            (dutyService.updateDutyById as jest.Mock).mockResolvedValueOnce(
                updatedDuty
            );

            await updateDuty(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(updatedDuty);
        });

        it("should return 404 when the duty is not found", async () => {
            mockReq = {
                params: { id: "1" },
                body: {
                    name: "Updated Duty",
                    description: "Updated description",
                    status: true,
                },
            };

            (dutyService.updateDutyById as jest.Mock).mockResolvedValueOnce(
                null
            );

            await updateDuty(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Duty with ID:1 not found",
            });
        });

        it("should return 500 when an error occurs during update", async () => {
            mockReq = {
                params: { id: "1" },
                body: {
                    name: "Updated Duty",
                    description: "Updated description",
                    status: true,
                },
            };
            (dutyService.updateDutyById as jest.Mock).mockRejectedValueOnce(
                new Error("Database error")
            );

            await updateDuty(mockReq as Request, mockRes as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Error updating duty",
            });
        });
    });
});
