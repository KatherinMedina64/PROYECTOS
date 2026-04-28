const routes = require('express').Router();
const controllerTarea = require('../controllers/tarea.controller');

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtener todas las tareas (con filtros opcionales)
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: proyectoId
 *         schema:
 *           type: integer
 *         description: Filtrar tareas por proyecto
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [PENDIENTE, EN_PROGRESO, COMPLETADA]
 *         description: Filtrar tareas por estado
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarea'
 */
routes.get('/tareas', controllerTarea.getTareas);

/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     summary: Obtener tarea por ID
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       404:
 *         description: Tarea no encontrada
 */
routes.get('/tareas/:id', controllerTarea.getTareaById);

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearTarea'
 *     responses:
 *       201:
 *         description: Tarea creada 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 */
routes.post('/tareas', controllerTarea.createTarea);

/**
 * @swagger
 * /api/tareas/{id}:
 *   patch:
 *     summary: Actualizar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/actualizaTarea'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 */
routes.patch('/tareas/:id', controllerTarea.updateTarea);

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea eliminada
 */
routes.delete('/tareas/:id', controllerTarea.deleteTarea);
module.exports = routes;