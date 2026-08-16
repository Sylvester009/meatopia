export interface Event {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image?: string;
  startDate: string;
  endDate: string;
  location?: string;
  discount?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}