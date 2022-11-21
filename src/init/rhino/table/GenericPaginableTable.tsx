import React from "react";
import { Card } from "../components/card/Card";
import { TextField } from "../inputs/nativeWrappers/TextField";

interface Props {
  isLoading: boolean;
  errorMessage?: string;
  tableLabels: TableLabel[];
  title?: string;
  subheader?: string;
  tableHeaderComponent?: React.ReactNode;
  tableBodyComponent: React.ReactNode;
  currentPage: number;
  totalCount: number | undefined;
  itemsPerPage: number;
  orderBy?: string;
  isAscending?: boolean;
  onPageChangeHandler: (page: number) => void;
  onChangeItemsPerPageHandler: (itemsPerPage: number) => void;
  sortByHandler?: (sortBy: string) => void;
  ascendingOrderHandler?: (isAscending: boolean) => void;
}

export interface TableLabel {
  id: string;
  label: string;
  sortable?: boolean;
}

export const GenericPaginableTable: React.FC<Props> = ({
  isLoading,
  errorMessage,
  tableLabels,
  title = "",
  subheader = "",
  tableHeaderComponent: tableHeaerComponent,
  tableBodyComponent,

  itemsPerPage,
  isAscending,
  totalCount,
  currentPage,
  orderBy,
  sortByHandler,
  ascendingOrderHandler,
  onPageChangeHandler,
  onChangeItemsPerPageHandler,
  ...other
}) => {
  const numberOfPages = totalCount ? Math.ceil(totalCount / itemsPerPage) : 0;
  const [dense, setDense] = React.useState(true);

  const onPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPageChangeHandler(e.target.value ? parseInt(e.target.value) : 0);
  };
  const onChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };
  const onChangeItemsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeItemsPerPageHandler(parseInt(event.target.value, 10));
  };

  return (
    <Card {...other}>
      {tableHeaerComponent}

      <div>
        <div>
          <table>
            <thead>
              <tr>
                {tableLabels.map((label) => (
                  <td key={label.id} scope="col">
                    {label.label}
                  </td>
                ))}
              </tr>
            </thead>
            {tableBodyComponent}
          </table>
        </div>
      </div>

      <div>
        <div>
          <div>
            <TextField
              label="Rows per page"
              name="itemsPerPage"
              value={itemsPerPage.toString()}
              onChange={onChangeItemsPerPage}
            />
          </div>
          <div>
            <span>Dense padding</span>
            <input type="checkbox" checked={dense} onChange={onChangeDense} />
          </div>
        </div>
        <div>
          <div>
            <span>Page:</span>
            <TextField
              label="Page"
              name="page"
              value={numberOfPages.toString()}
              onChange={onPageChange}
            />
            <span>of</span>
            <span>{numberOfPages}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
