
 export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  };

  export type Coordinate = [number, number];
  enum RobotIssue {
  LOW_BATTERY = "low_battery",
  SW_ISSUE = "sw_issue",
  HW_ISSUE = "hw_issue",
  FLIPPED = "flipped",
  IMMOBILE = "immobile",
  }

  export interface Robot {
  id: string;
  name: string;
  issue: RobotIssue;
  }

  export enum TripStatus {
  ACTIVE = "active",
  STALLED = "stalled",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  }

  export interface Trip {
  id: string;
  created_at: Date;
  updated_at: Date;
  source: Coordinate;
  destination: Coordinate;
  location: Coordinate;
  status: TripStatus;
  robot: Robot;
  }

  export interface Merchant {
  id: string;
  name: string;
  location: Coordinate;
  address: string;
  }

  export interface Customer {
  id: string;
  name: string;
  phone_number: string;
  location: Coordinate;
  address: string;
  }

  export enum DeliveryStage {
  AT_MX = "at_merchant",
  ON_TRIP = "on_trip",
  AT_CX = "at_customer",
  }

  export interface Delivery {
  id: string;
  created_at: Date;
  stage: DeliveryStage;
  merchant: Merchant;
  customer: Customer;
  trip: Trip;
  }

  export enum UserRole {
  DISPATCH = "dispatch",
  FIELD_OP = "field_op",
  }

  export interface User {
  id: string;
  name: string;
  role: UserRole;
  username: string;
  phone_no: string;
  }

