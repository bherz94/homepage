import type { BaseObject } from './base-object';

export interface BaseResponse<T extends BaseObject> {
  data: T | T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
