import axios from 'axios';
import { format } from 'date-fns';

const BASE_URL = 'http://10.10.1.7:8304';

const headers = {
  'Content-Type': 'application/json'
};

// 1. Get Shift List
export interface ShiftData {
  ShiftId: number;
  ShiftName: string;
}

export interface ShiftResponse {
  data: ShiftData[];
  success: boolean;
  message: string;
}

export const fetchShiftData = async (): Promise<ShiftResponse> => {
  const response = await axios.get(`${BASE_URL}/api/commonappservices/getshiftdatalist`);
  return response.data;
};

// 2. Get Material List
export interface MaterialData {
  MaterialCode: string;
  MaterialName: string;
}

export const fetchMaterialList = async (fromDate: Date, toDate: Date, shiftIds: number[]): Promise<MaterialData[]> => {
  const params = {
    FromDate: format(fromDate, 'dd/MM/yyyy'),
    ToDate: format(toDate, 'dd/MM/yyyy'),
    ShiftId: shiftIds.join(',')
  };
  
  const response = await axios.get(
    `${BASE_URL}/api/productionappservices/getspcmateriallist`,
    { params }
  );
  return response.data;
};

// 3. Get Operation List
export interface OperationData {
  OperationCode: string;
  OperationName: string;
}

export const fetchOperationList = async (
  fromDate: Date, 
  toDate: Date, 
  materialCode: string, 
  shiftIds: number[]
): Promise<OperationData[]> => {
  const params = {
    FromDate: format(fromDate, 'dd/MM/yyyy'),
    ToDate: format(toDate, 'dd/MM/yyyy'),
    MaterialCode: materialCode,
    ShiftId: shiftIds.join(',')
  };
  
  const response = await axios.get(
    `${BASE_URL}/api/productionappservices/getspcoperationlist`,
    { params }
  );
  return response.data;
};

// 4. Get Gauge List
export interface GuageData {
  GuageCode: string;
  GuageName: string;
}

export const fetchGuageList = async (
  fromDate: Date, 
  toDate: Date, 
  materialCode: string, 
  operationCode: string, 
  shiftIds: number[]
): Promise<GuageData[]> => {
  const params = {
    FromDate: format(fromDate, 'dd/MM/yyyy'),
    ToDate: format(toDate, 'dd/MM/yyyy'),
    MaterialCode: materialCode,
    OperationCode: operationCode,
    ShiftId: shiftIds.join(',')
  };
  
  const response = await axios.get(
    `${BASE_URL}/api/productionappservices/getspcguagelist`,
    { params }
  );
  return response.data;
};

// 5. Get PIR Inspection Data List
export interface InspectionData {
  TrnDate: string;
  ShiftCode: number;
  ShiftName: string;
  GuageCode: string;
  GuageName: string;
  FromSpecification: string;
  ToSpecification: string;
  ActualSpecification: string;
}

export const fetchInspectionData = async (
  fromDate: Date,
  toDate: Date,
  materialCode: string,
  operationCode: string,
  guageCode: string,
  shiftIds: number[]
): Promise<InspectionData[]> => {
  const params = {
    FromDate: format(fromDate, 'dd/MM/yyyy'),
    ToDate: format(toDate, 'dd/MM/yyyy'),
    MaterialCode: materialCode,
    OperationCode: operationCode,
    GuageCode: guageCode,
    ShiftId: shiftIds.join(',')
  };
  
  const response = await axios.get(
    `${BASE_URL}/api/productionappservices/getspcpirinspectiondatalist`,
    { params }
  );
  return response.data;
};