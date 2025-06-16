export interface Job {
  _id: string;
  postName: string;
  metaTitle: string;
  department: string;
  categoryNumber: string;
  salary: string;
  vacancyNumber: string;
  appointment: string;
  ageLimit: string;
  notificationDate: string;
  lastDate: string;
  education: string;
  imageUrl: string;
  jobDescription: string;
  metaDescription: string;
  eligble: string;
  metaKeywords: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}[]

export interface JobResponse {
  success: boolean;
  data: Job[];
  count: number;
  message: string;
  status: number;
}