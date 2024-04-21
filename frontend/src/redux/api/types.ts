export interface GenericResponse {
  status: string;
  message: string;
}

export interface IResetPasswordRequest {
  resetToken: string;
  password: string;
  passwordConfirm: string;
}

export interface IPostRequest {
  title: string;
  content: string;
  image: string;
  user: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  photo: string;
  _id: string;
  id: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface IPostResponse {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  user: IUser;
  created_at: string;
  updated_at: string;
}

export interface ISensorResponse {
  id: string;
  humidity: number;
  temperature: number;
  season: string;
  created_at: string;
  updated_at: string;
}

// Interface to represent a sensor reading
export interface ISensorData {
  temperature: number;
  humidity: number;
  created_at: string;
  period: string; // 'morning', 'afternoon', 'night'
}

// Interface for period-based averages
export interface IPeriodAverage {
  period: string;
  average_temperature: number;
  average_humidity: number;
  sensor_data: ISensorData[];
}

// Interface for the overall response structure
export interface IDailyAndPeriodAveragesResponse {
  map(arg0: (item: IPeriodAverage) => string): unknown;
  status: string;
  data: IPeriodAverage[];
}
