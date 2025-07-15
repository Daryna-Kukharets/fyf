export interface RequestParams<T> {
  endpoint: string;
  data?: T;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  baseUrl?: string;
}

const BASE_URL = "http://localhost:8081";

export const sendRequest = async <T extends FormData | object>({
  endpoint,
  data,
  method = "POST",
  baseUrl = BASE_URL,
}: RequestParams<T>) => {
  try {
    const url = `${baseUrl}/${endpoint}`;

    const options: RequestInit = {
      method,
      headers:
        data instanceof FormData || method === "GET"
          ? undefined
          : {
              "Content-Type": "application/json",
            },
    };

    if (method !== "GET" && data) {
      options.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    const response = await fetch(url, options);

    const contentType = response.headers.get("Content-Type");

    if (!response.ok) {
      let message = "Невідома помилка";
      if (contentType?.includes("application/json")) {
        const errorJson = await response.json();
        message = errorJson.message || JSON.stringify(errorJson);
      } else {
        message = await response.text();
      }

      throw { status: response.status, message };
    }

    const text = await response.text();
    if (!text) {
      return null;
    }

    if (contentType?.includes("application/json")) {
      return JSON.parse(text);
    }

    return text;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData: FormData) => {
  return sendRequest({
    endpoint: "auth/registration",
    data: formData,
  });
};

export const loginUser = async (data: { email: string; password: string }) => {
  return sendRequest({
    endpoint: "auth/login",
    data,
  });
};

export const logoutUser = async () => {
  return sendRequest({
    endpoint: "auth/logout",
  });
};

export const deleteUser = async () => {
  return sendRequest({
    endpoint: "users/deleteMe",
    method: "DELETE",
  });
};