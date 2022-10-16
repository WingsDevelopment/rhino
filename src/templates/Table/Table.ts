interface Props<T> {
  models: T[];
  isLoading: boolean;
  errorMessage?: string;
}

// export const TagTableContainer: React.FC<Props> = ({
//   isLoading,
//   tags,
//   errorMessage,
// }) => {
//   //genericki hook za paginaciju i sortiranje
//   const { dataToShow, page, setPage, rowsPerPage, setRowsPerPage, setSortBy } =
//     usePaginableSortedData(tags, "title"); //title je property name u Tag modelu

//   const tableLabels = useMemo(
//     () => [
//       // id mora biti unique
//       // Obratiti paznju, id: mora biti ime polja iz modela ukoliko je sortable true!!!
//       // ukoliko se prosledi sortable: true, onda se prikazuje strelica za sortiranje, i sort radi
//       { id: "title", label: "Naziv", sortable: true },
//       { id: "urlSlug", label: "URL slug" },
//       { id: "createdAt", label: "Napravljen", sortable: true },
//       { id: "updatedAt", label: "Izmenjen", sortable: true },
//       // ukoliko se ne prosledi sortable, onda se ne prikazuje strelica za sortiranje, i sort ne radi
//       { id: "#1", label: "#" },
//       { id: "#2", label: "#" },
//     ],
//     []
//   );

//   return (
//     <GenericPaginableTable
//       subheader="Tabela tagova"
//       isLoading={isLoading}
//       errorMessage={errorMessage}
//       totalCount={tags?.length}
//       currentPage={page}
//       onPageChangeHandler={setPage}
//       onChangeItemsPerPageHandler={setRowsPerPage}
//       sortByHandler={setSortBy}
//       itemsPerPage={rowsPerPage}
//       tableBodyComponent={
//         <TagsTableBody
//           tags={dataToShow as Tag[] | undefined}
//           isLoading={isLoading}
//         />
//       }
//       tableLabels={tableLabels}
//     />
//   );
// };
export const Table = <T extends {}>(props: Props<T>) => {
  var firstModel = props.models[0];
  Object.keys(firstModel).forEach((key) => {
    console.log(typeof (firstModel as any)[key]);
  });
};
