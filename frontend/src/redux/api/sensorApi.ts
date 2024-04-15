import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { ISensorResponse } from './types';

export const sensorApi = createApi({
  reducerPath: 'sensorApi',
  baseQuery: customFetchBase,
  tagTypes: ['Sensors'],
  endpoints: (builder) => ({
    getSensor: builder.query<ISensorResponse, string>({
      query(id) {
        return {
          url: `/sensors/${id}`,
          credentials: 'include',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'Sensors', id }],
    }),
    getAllSensors: builder.query<ISensorResponse[], void>({
      query() {
        return {
          url: `/sensors/index`,
          credentials: 'include',
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Sensors' as const,
                id,
              })),
              { type: 'Sensors', id: 'LIST' },
            ]
          : [{ type: 'Sensors', id: 'LIST' }],
      transformResponse: (results: { data: { sensors: ISensorResponse[] } }) =>
        results.data.sensors,
    }),
  }),
});

export const { useGetAllSensorsQuery } = sensorApi;
