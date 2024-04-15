import express from 'express';
import {
  findSeasonByHandler,
  indexHandler,
  registerSensorHandler,
} from '../controllers/sensor.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createSensorSchema } from '../schemas/sensor.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Register Sensor Info
router.post('/create', validate(createSensorSchema), registerSensorHandler);

// Show Sensor Info
router.get('/index', deserializeUser, requireUser, indexHandler);

// // Logout user
router.get('/:season', deserializeUser, requireUser, findSeasonByHandler);

// // Refresh access token
// router.get('/delete', refreshAccessTokenHandler);

export default router;
