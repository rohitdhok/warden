declare global {
  namespace Express {
    interface Request {
      clientId?: string;
      adminId?: string;
    }
  }
}

export {};