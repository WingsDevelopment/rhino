import React, { useCallback, useEffect } from "react";

export const usePaginableSortedData = (
  data: any[] | undefined,
  defaultOrderBy: string,
  defaultRowsPerPage: number = 10
) => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
  const [isAscending, setIsAscending] = React.useState(true);
  const [dataToShow, setDataToShow] = React.useState<any[] | undefined>(
    undefined
  );

  const getPageData = useCallback(
    (page: number, rowsPerPage: number, dataToShow: any[] | undefined) => {
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const pageData = dataToShow?.slice(startIndex, endIndex);
      return pageData;
    },
    []
  );
  const getSortedData = useCallback(
    (data: any[] | undefined, orderBy: string, isAscending: boolean) => {
      if (!data) return;
      if (!orderBy) return data;

      const sortedData = [...data].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
          return isAscending ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
          return isAscending ? 1 : -1;
        }
        return 0;
      });

      return sortedData;
    },
    []
  );

  useEffect(() => {
    if (!data) return;
    const sortedData = getSortedData(data, orderBy, isAscending);
    const pagedData = getPageData(page, rowsPerPage, sortedData);
    setDataToShow(pagedData);
  }, [
    data,
    page,
    rowsPerPage,
    orderBy,
    isAscending,
    getSortedData,
    getPageData,
  ]);

  const setSortBy = (id: string) => {
    if (id !== "") {
      setIsAscending(orderBy === id);
      setOrderBy(id);
    }
  };

  return {
    dataToShow,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    orderBy,
    isAscending,
    setSortBy,
  };
};
