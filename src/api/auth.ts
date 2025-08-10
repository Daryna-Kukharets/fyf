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
  baseUrl = "http://localhost:8081",
}: RequestParams<T>) => {
  try {
    const url = `${baseUrl}/${endpoint}`;

    const token = JSON.parse(localStorage.getItem("auth-storage") || "{}")
      ?.state?.token;

    console.log("🔐 JWT токен, який використовується:", token);

    const isAuthEndpoint = endpoint.startsWith("auth/");

    const headers: HeadersInit =
      data instanceof FormData || method === "GET"
        ? {}
        : {
            "Content-Type": "application/json",
          };

    if (token && !isAuthEndpoint) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
      credentials: "include",
    };

    if (method !== "GET" && data) {
      options.body = data instanceof FormData ? data : JSON.stringify(data);
    }

    console.log("🌐 Запит:", {
      url,
      method,
      headers,
      body: options.body,
      tokenUsed: token,
    });

    const response = await fetch(url, options);

    const contentType = response.headers.get("Content-Type");

    console.log("📥 Відповідь від сервера:", {
      status: response.status,
      contentType,
    });

    if (!response.ok) {
      let message = "Невідома помилка";
      if (contentType?.includes("application/json")) {
        const errorJson = await response.json();
        message = errorJson.message || JSON.stringify(errorJson);
        console.error("⛔ JSON-помилка від сервера:", errorJson);
      } else {
        message = await response.text();
        console.error("⛔ Текстова помилка від сервера:", message);
      }

      throw { status: response.status, message };
    }

    const text = await response.text();

    if (!text) {
      console.log("⚠️ Порожня відповідь від сервера");
      return null;
    }

    if (contentType?.includes("application/json")) {
      return JSON.parse(text);
    }

    return text;
  } catch (error) {
    console.error("💥 Помилка під час виконання fetch:", error);
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

export const getProfile = async () => {
  return sendRequest({
    endpoint: "users/me",
    method: "GET",
  });
};

export const getAllActivities = async () => {
  return sendRequest({
    endpoint: "activity",
    data: {
      page: 0,
      size: 1000,
      sort: ["localDateTime,asc"],
    },
  });
};

export const participateInActivity = async (id: number) => {
  return sendRequest({
    endpoint: `activity/participate/${id}`,
  });
};

export const refuseActivity = async (id: number) => {
  return sendRequest({
    endpoint: `activity/refuse/${id}`,
  });
};

export const getMyActivities = async () => {
  return sendRequest({
    endpoint: "activity/myParticipating",
    data: {
      page: 0,
      size: 100,
      sort: ["localDateTime,asc"],
    },
  });
};

export const sendReview = async (data: {
  title: string;
  rate: number;
  comment: string;
}) => {
  return sendRequest({
    endpoint: "review",
    data,
  });
};

export const getReview = async () => {
  return sendRequest({
    endpoint: "review",
    method: "GET",
    data: {
      page: 0,
      size: 100,
      sort: ["localDateTime,asc"],
    },
  });
};
