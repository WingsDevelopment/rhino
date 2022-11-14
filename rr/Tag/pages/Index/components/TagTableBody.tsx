
interface Props {
    newTagDtos: NewTagDto[] | undefined;
    isLoading: boolean;
}

export const NewTagDtoTableBody: React.FC<Props> = ({ newTagDtos, isLoading }) => {
    const navigate = useNavigate();

    const rows = () => (
        <>
            {newTagDtos?.map((item, index) => (
                <TableRow key={index}>
                    
                    <TableCell align="right">
                        <TableButtonWithDetailsIcon
                            label="Detalji"
                            onClick={() => navigate(NewTagDtoRoutes.details + '/' + item.id)}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
    if (!newTagDtos) {
        return <GenericTableBody rows={<></>} hasData={false} isLoading={isLoading} />;
    }
    return (
        <GenericTableBody
            rows={rows()}
            hasData={newTagDtos !== undefined && newTagDtos.length > 0}
            isLoading={isLoading}
        />
    );
};

export default NewTagDtoTableBody;