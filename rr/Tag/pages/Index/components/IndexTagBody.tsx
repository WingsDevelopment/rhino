
interface Props {
    newTagDtos: NewTagDto[] | undefined;
    isLoading: boolean;
}

export const IndexNewTagDtoBody: React.FC<Props> = ({ newTagDtos, isLoading }) => {
    const { dataToShow, page, setPage, rowsPerPage, setRowsPerPage, setSortBy } =
     usePaginableSortedData(newTagDtos, ''); 

     const tableLabels = useMemo(
        () => [
            
            { id: '#', label: '#' },
        ],
        []
    );

    return (
        <GenericPaginableTable
            subheader="Tabela NewTagDto"
            isLoading={isLoading}
            totalCount={newTagDtos?.length}
            currentPage={page}
            onPageChangeHandler={setPage}
            onChangeItemsPerPageHandler={setRowsPerPage}
            sortByHandler={setSortBy}
            itemsPerPage={rowsPerPage}
            tableBodyComponent={
                <<TagTableBody tags={tags} isLoading={isLoading} />/>
            }
            tableLabels={tableLabels}
        />
    )
}

export default IndexNewTagDtoBody;