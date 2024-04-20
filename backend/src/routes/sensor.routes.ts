import express from 'express';
import {
  findSeasonByHandler,
  getDailyAndPeriodAveragesHandler,
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

// Add a new route for calculating averages
router.get(
  '/info/averages',
  deserializeUser,
  requireUser,
  getDailyAndPeriodAveragesHandler
);

export default router;
