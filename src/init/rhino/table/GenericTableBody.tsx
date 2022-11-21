interface Props {
  hasData: boolean;
  isLoading: boolean;
  rows: React.ReactNode;
}

export const GenericTableBody: React.FC<Props> = ({
  hasData,
  isLoading,
  rows,
}) => {
  const getTableBody = () => {
    if (isLoading) {
      return <TableSkeleton rowCount={13} />;
    } else if (!hasData) {
      return <TableNoData isNotFound={true} />;
    } else {
      return <>{rows}</>;
    }
  };

  return <tbody>{getTableBody()}</tbody>;
};

const TableSkeleton = ({ rowCount }: { rowCount: number }) => {
  return (
    <>
      {Array.from(Array(rowCount).keys()).map((index) => (
        <tr key={"row-" + index}>
          <td>skeleton...</td>
          <td>skeleton...</td>
          <td>skeleton...</td>
          <td>skeleton...</td>
          <td>skeleton...</td>
          <td>skeleton...</td>
          <td>skeleton...</td>
          <td>skeleton...</td>
        </tr>
      ))}
    </>
  );
};

const TableNoData = ({ isNotFound }: { isNotFound: boolean }) => {
  return (
    <tr>
      <td colSpan={8}>{isNotFound ? "NO DATA FOUND" : "LOADING..."}</td>
    </tr>
  );
};
