"use client";
import { useMemo, useRef } from "react";
import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import { getAccessToken, getCurrentAddress } from "../utils/common";
import { ORDER_BY } from "../utils/constant";

// Process query parameters dynamically
const processQuery = (query: any, extraParams: Record<string, any> = {}) => {
  let take = 10;
  let pageIndex = 1;
  let search = "";
  let sortOrder = "";
  let sortBy = "";

  query.queries.forEach((q: any) => {
    if (q.fn === "onTake") {
      take = q.e.nos;
    }
    if (q.fn === "onPage") {
      pageIndex = q.e.pageIndex;
    }
    if (q.fn === "onSearch") {
      search = q.e.searchKey;
      pageIndex = 1;
    }
    if (q.fn === "onSortBy") {
      sortBy = q.e.fieldName;
      sortOrder = ORDER_BY[q.e.direction];
    }
  });

  const queryParams = new URLSearchParams({
    ...(take !== null && { limit: take.toString() }),
    ...(pageIndex !== null && { page: pageIndex.toString() }),
    ...(search ? { search } : {}),
    ...(sortBy ? { sortBy } : {}),
    ...(sortOrder ? { sortOrder } : {}),
    ...extraParams, // ✅ Add additional params dynamicallys
  });

  return `?${queryParams.toString()}`;
};

// Create a reusable custom adaptor
const createCustomAdaptor = (
  apiEndpoint: string,
  extraParams: Record<string, any> = {}
) => {
  return class CustomAdaptor extends UrlAdaptor {
    processQuery(ds: any, query: any) {
      const updatedQuery = processQuery(query, extraParams);
      console.log(`${apiEndpoint}${updatedQuery}`, "storage");
      return {
        url: `${apiEndpoint}${updatedQuery}`,
        type: "GET",
      };
    }

    processResponse(response: any) {
      return {
        result: response.data.data,
        count: response.data.total_records,
      };
    }
  };
};

// Create the `useDataManager` hook with pagination
const useDataManager = (
  apiEndpoint: string,
  extraParams: Record<string, any> = {}
) => {
  const gridRef = useRef<any>(null);
  const token = getAccessToken();
  const xCurAdd = getCurrentAddress();
  const dataManager = useMemo(() => {
    return new DataManager({
      url: apiEndpoint,
      adaptor: new (createCustomAdaptor(apiEndpoint, extraParams))(),
      crossDomain: true,
      headers: [
        {
          Authorization: `Bearer ${token}`,
          "x-cur-add": xCurAdd,
        },
      ],
    });
  }, [apiEndpoint, extraParams]);

  //  Handle pagination inside the hook
  const actionBegin = (event: any) => {
    if (event.requestType === "paging") {
      const query = new Query().take(event.pageSize);
      gridRef.current?.setProperties({ query }, true);
    }
  };

  return { dataManager, actionBegin, gridRef };
};

export default useDataManager;
