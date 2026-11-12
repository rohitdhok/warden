import { NextFunction, Request, Response } from "express";
import { createService, deleteService, getAllServices, getServiceById, updateService } from "../services/service.service.js";
import { AppError } from "../errors/app.error.js";

export async function handleCreateService(req: Request, res: Response) {
    const name = req.body.name;
    const base_url = req.body.base_url;

    const service = await createService(name, base_url);

    return res.status(201).json({service});
}

export async function handleGetAllServices(req: Request, res: Response) {
    const services = await getAllServices();
    return res.json({services})
}

export async function handleGetServiceById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.serviceId;
    if (typeof id !== "string") { return next(new AppError("invalid service id", 400)) }

    const service = await getServiceById(id);

    if (!service) {return next(new AppError("Service not found", 404));}
    return res.json({service});
}

export async function handleUpdateService(req: Request, res: Response, next: NextFunction) {
    const id = req.params.serviceId;
    const name = req.body.name;
    const base_url = req.body.base_url;

    if (typeof id !== "string") { return next(new AppError("invalid service id", 400)) }

    const service = await updateService(id, name, base_url);

    if (!service) {return next(new AppError("Service not found", 404));}
    return res.json({service});
}

export async function handleDeleteService(req: Request, res: Response, next: NextFunction) {
    const id = req.params.serviceId;
    if (typeof id !== "string") { return next(new AppError("invalid service id", 400)) }

    const service = await deleteService(id);

    if (!service) {return next(new AppError("Service not found", 404));}
    return res.json({service});
}