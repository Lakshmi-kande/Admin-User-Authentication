/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register a new admin
 *     description: Use this endpoint to register a new admin
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobile:
 *                 type: string
 *               address:
 *                 type: string
 *               profilePic:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *       400:
 *         description: Validation error
 *
 * /api/admin/login:
 *   post:
 *     summary: Login as an admin
 *     description: Use this endpoint to login as an admin
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 * 
 * 
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     description: Use this endpoint to retrieve a list of all users
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Successful response with a list of users
 *       500:
 *         description: Internal server error
 *
 * /api/admin/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Use this endpoint to delete a user by ID
 *     tags:
 *       - Admin
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 *
 * 
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Use this endpoint to register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               mobile:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePic:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *
 * /api/users/login:
 *   post:
 *     summary: Login as a user
 *     description: Use this endpoint to login as a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login successful
 *       400:
 *         description: Validation error or invalid credentials
 *
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     description: Use this endpoint to update the user profile
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               profilePic:
 *                 type: string
 *               mobile:
 *                 type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Validation error or user not found
 *       401:
 *         description: Unauthorized
 * 
 * 
 * /api/dashboard/users:
 *   get:
 *     summary: Get all users
 *     description: Use this endpoint to retrieve a list of all users
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Successful response with a list of users
 *       500:
 *         description: Internal server error
 *
 * /api/dashboard/users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Use this endpoint to delete a user by ID
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */
