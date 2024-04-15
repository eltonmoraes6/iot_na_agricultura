import { DeepPartial } from 'typeorm';
import { Sensor } from '../entities/sensor.entity';
import { AppDataSource } from '../utils/data-source';

const sensorRepository = AppDataSource.getRepository(Sensor);

export const createSensor = async (input: DeepPartial<Sensor>) => {
  return sensorRepository.save(sensorRepository.create(input));
};

export const findSensorBySeason = async (season: string) => {
  return await sensorRepository.findBy({ season: season });
};

export const findSensorById = async (sensorId: string) => {
  return await sensorRepository.findOneBy({ id: sensorId });
};

export const findSensor = async (query: Object) => {
  return await sensorRepository.find(query);
};
