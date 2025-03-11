import { FC, ReactNode } from "react";

export const Card: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>;
};

export const CardHeader: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mb-2 font-semibold text-lg">{children}</div>;
};

export const CardTitle: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return <h3 className={`text-xl font-bold ${className}`}>{children}</h3>;
};

export const CardContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};
