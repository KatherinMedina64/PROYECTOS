const prisma = require('../config/prisma');

const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await prisma.usuarios.findMany({
            select: { id: true, nombre: true, email: true, createAt: true }
        });

        res.json(usuarios);
    } catch (error) {
        next(error);
    }
};

const getUsuarioById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const usuario = await prisma.usuarios.findUnique({
            where: { id: parseInt(id) },
            select: { id: true, nombre: true, email: true, createAt: true },
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        next(error);
    }
};

const createUsuario = async (req, res, next) => {
    try {
        const { nombre, email, password } = req.body;

        const existingUsuario = await prisma.usuarios.findUnique({
            where: { email },
        });

        if (existingUsuario) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        const newUsuario = await prisma.usuarios.create({
            data: { nombre, email, password },
            select: { id: true, nombre: true, email: true, createAt: true },
        });

        res.status(201).json(newUsuario);
    } catch (error) {
        next(error);
    }
};

const updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        const data = {};

        if (nombre !== undefined) data.nombre = nombre;
        if (email !== undefined) data.email = email;
        if (password !== undefined) data.password = password;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: 'No se enviaron campos para actualizar' });
        }

        const updatedUsuario = await prisma.usuarios.update({
            where: { id: parseInt(id) },
            data,
            select: { id: true, nombre: true, email: true, createAt: true },
        }).catch((e) => {
            if (e.code === 'P2025') return null;
            throw e;
        });

        if (!updatedUsuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(updatedUsuario);
    } catch (error) {
        next(error);
    }
};

const deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingUsuario = await prisma.usuarios.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingUsuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await prisma.usuarios.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};