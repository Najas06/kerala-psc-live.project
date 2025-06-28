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
  createdAt?: string;
  updatedAt?: string;
  __v: number;
};

export interface JobResponse {
  success: boolean;
  data: Job[];
  count: number;
  message: string;
  status: number;
  latestJobs: Job[];
  tenthLevel: Job[];
  twelfthLevel: Job[];
  degreeLevel: Job[];
  postGraduateLevel: Job[];
}

export interface SingleJobResponse {
  success: boolean;
  data: Job;
  message: string;
  status: number;
}

export interface Article {
  _id: string;
  title: string;
  imageUrl: string;
  author: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  content: string;
  createdAt?: string; // Or Date, depending on how you deserialize
  updatedAt?: string; // Or Date
  __v: number;
}



export interface ArticleResponse {
  success: boolean;
  data: Article[];
  count: number;
  message: string;
  status: number;
}



export interface SingleArticleResponse {
  success: boolean;
  data: Article;
  message: string;
  status: number;
}


export interface Subscriber {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}

export interface SubscriberResponse {
  success: boolean;
  data: Subscriber[];
  count: number;
  message: string;
  status: number;
}

export interface SingleSubscriberResponse {
  success: boolean;
  data: Subscriber;
  message: string;
  status: number;
}
