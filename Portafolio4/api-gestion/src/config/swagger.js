const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API gestion de proyectos',
            version: '1.0.0',
            description: 'API REST para la gestion de proyectos',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Katherin Medina' },
                        email: { type: 'string', example: 'katherin@example.com' },
                        createAt: { type: 'string', format: 'date-time' },
                    },
                },

                CrearUsuario: {
                    type: 'object',
                    required: ['nombre', 'email', 'password'],
                    properties: {
                        nombre: { type: 'string', example: 'Katherin Medina' },
                        email: { type: 'string', example: 'katherin@example.com' },
                        password: { type: 'string', example: 'Seguro123!' },
                    },
                },

                ActualizarUsuario: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string', example: 'Katherin Medina' },
                        email: { type: 'string', example: 'katherin@example.com' },
                        password: { type: 'string', example: 'Seguro123!' },
                    },
                },

                Proyecto: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nombre: { type: 'string', example: 'Proyecto Alpha' },
                        descripcion: { type: 'string', example: 'Descripcion del proyecto' },
                        usuarioId: { type: 'integer', example: 1 },
                        createAt: { type: 'string', format: 'date-time' },
                    },
                },

                CrearProyecto: {
                    type: 'object',
                    required: ['nombre', 'usuarioId'],
                    properties: {
                        nombre: { type: 'string', example: 'Sistema de Gestión' },
                        descripcion: { type: 'string', example: 'Proyecto para administrar tareas y usuarios' },
                        usuarioId: { type: 'integer', example: 1 },
                    },
                },

                ActualizarProyecto: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string', example: 'Sistema de Gestión Actualizado' },
                        descripcion: { type: 'string', example: 'Nueva descripción del proyecto' },
                        usuarioId: { type: 'integer', example: 1 },
                    },
                },

                Tarea: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        titulo: { type: 'string', example: 'Diseñar base de datos' },
                        descripcion: { type: 'string', example: 'Crear el modelo entidad relación del sistema' },
                        estado: {
                            type: 'string',
                            enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'],
                            example: 'PENDIENTE',
                        },
                        createAt: { type: 'string', format: 'date-time' },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 },
                    },
                },

                CrearTarea: {
                    type: 'object',
                    required: ['titulo', 'proyectoId'],
                    properties: {
                        titulo: { type: 'string', example: 'Diseñar base de datos' },
                        descripcion: { type: 'string', example: 'Crear el modelo entidad relación del sistema' },
                        estado: {
                            type: 'string',
                            enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'],
                            example: 'PENDIENTE',
                        },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 },
                    },
                },

                ActualizarTarea: {
                    type: 'object',
                    properties: {
                        titulo: { type: 'string', example: 'Actualizar diseño de base de datos' },
                        descripcion: { type: 'string', example: 'Modificar tablas y relaciones' },
                        estado: {
                            type: 'string',
                            enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'],
                            example: 'EN_PROCESO',
                        },
                        proyectoId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };