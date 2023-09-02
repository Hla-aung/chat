export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

export interface InitialChat {
    message: string;
    senderId: string;
    timestamp: number;
    _id: string;
  }

export interface Friends {
    _id: string;
    email: string;
    username: string;
    image: string;
  };