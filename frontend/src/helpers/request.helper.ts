import { useLocaleStore } from '@/stores/locale.store';

export type ResponseError = {
  message: string;
  statusCode: number;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseUrl = import.meta.env.VITE_STRAPI_URL;

export const requestHelper = {
  get: <T>(
    url: string,
    params?: string[] | string,
    body?: any,
    external: boolean = false
  ) => request<T>('GET')(url, params, body, external),
  post: <T>(
    url: string,
    params?: string[] | string,
    body?: any,
    external: boolean = false
  ) => request<T>('POST')(url, params, body, external),
  put: <T>(
    url: string,
    params?: string[] | string,
    body?: any,
    external: boolean = false
  ) => request<T>('PUT')(url, params, body, external),
  delete: <T>(
    url: string,
    params?: string[] | string,
    body?: any,
    external: boolean = false
  ) => request<T>('DELETE')(url, params, body, external),
};

function request<T>(method: string) {
  return async (
    url: string,
    params?: string[] | string,
    body?: any,
    external: boolean = false
  ) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    let reqParams: string[] = [];
  
    if (params) {
      Array.isArray(params)
        ? reqParams.push(...params)
        : reqParams.push(params);
    }

    if (!external) {
      const { getLocale } = useLocaleStore();
      reqParams.push(`locale=${getLocale}`);
      url = `${baseUrl}/${url}?${reqParams.join('&')}`;
      const apiToken = import.meta.env.VITE_STRAPI_KEY;

      if (apiToken) requestHeaders.set('Authorization', `Bearer ${apiToken}`);
    } else {
      url = `${url}?${reqParams.join('&')}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    return fetch(url, requestOptions).then((res) => handleResponse<T>(res));
  };
}

// helper functions

async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  let data = text;

  if (isJsonString(text)) {
    data = data && JSON.parse(text);
  }

  if (!response.ok) {
    await handleErrorResponse(response, data);
  }

  return data as T;
}

function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function handleErrorResponse(response: Response, data: any) {
  let error: ResponseError;

  if (typeof data === 'string') {
    error = {
      message: data,
      statusCode: response.status,
    };
  } else {
    error = {
      message: (data && data.detail) || response.statusText,
      statusCode: response.status,
    };
  }

  return Promise.reject(error);
}
