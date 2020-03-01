
// export type ApiMethod = "POST" | "GET" | "DELETE" | "PUT";

// export interface AuthResponse {
//   username: string;
//   password: string;
// };

export interface ServerResponse<T> {
  data: T;
  status: number;
  statusText: string;
  config: {
    url?: string;
    method?: string;
    data?: string;
  };
};
