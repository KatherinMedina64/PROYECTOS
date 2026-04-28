const prisma = require('../config/prisma');

const getTareas = async (req, res, next) => {
    try {
        const { proyectoId, estado } = req.query;

        const tareas = await prisma.tarea.findMany({
            where: {
                ...(proyectoId && { proyectoId: Number(proyectoId) }),
                ...(estado && { estado }),
            },
            include: {
                Proyecto: { select: { nombre: true } },
                usuario: { select: { nombre: true } },
            },
        });

        res.json(tareas);
    } catch (error) {
        next(error);
    }
};

const getTareaById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tarea = await prisma.tarea.findUnique({
            where: { id: parseInt(id) },
            include: { Proyecto: true, usuario: true },
        });

        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json(tarea);
    } catch (error) {
        next(error);
    }
};

const createTarea = async (req, res, next) => {
    try {
        const { titulo, descripcion, proyectoId, usuarioId } = req.body;

        const existingProyecto = await prisma.proyecto.findUnique({
            where: { id: parseInt(proyectoId) },
        });

        if (!existingProyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        if (usuarioId !== undefined) {
            const existingUsuario = await prisma.usuarios.findUnique({
                where: { id: parseInt(usuarioId) },
            });

            if (!existingUsuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
        }

        const tarea = await prisma.tarea.create({
            data: {
                titulo,
                descripcion,
                proyectoId,
                usuarioId,
            },
        });

        res.status(201).json(tarea);
    } catch (error) {
        next(error);
    }
};

const updateTarea = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, estado, usuarioId, proyectoId } = req.body;

        if (usuarioId !== undefined) {
            const existingUsuario = await prisma.usuarios.findUnique({
                where: { id: parseInt(usuarioId) },
            });

            if (!existingUsuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
        }

        if (proyectoId !== undefined) {
            const existingProyecto = await prisma.proyecto.findUnique({
                where: { id: parseInt(proyectoId) },
            });

            if (!existingProyecto) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }
        }

        const data = {};

        if (titulo !== undefined) data.titulo = titulo;
        if (descripcion !== undefined) data.descripcion = descripcion;
        if (estado !== undefined) data.estado = estado;
        if (usuarioId !== undefined) data.usuarioId = usuarioId;
        if (proyectoId !== undefined) data.proyectoId = proyectoId;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No se enviaron campos para actualizar tarea' });
        }

        const updateTarea = await prisma.tarea.update({
            where: { id: Number(id) },
            data,
        });

        res.json(updateTarea);
    } catch (error) {
        next(error);
    }
};

const deleteTarea = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingTarea = await prisma.tarea.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingTarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        await prisma.tarea.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTareas,
    getTareaById,
    createTarea,
    updateTarea,
    deleteTarea
};