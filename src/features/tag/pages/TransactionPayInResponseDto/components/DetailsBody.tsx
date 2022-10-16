
interface Props {
    transactionPayInResponseDto: TransactionPayInResponseDto;
    isLoading: boolean;
}

export const DetailsTransactionPayInResponseDtoBody: React.FC<Props> = ({ transactionPayInResponseDto, isLoading }) => {
    return (
        <LoadableCardWrapper isLoading={isLoading}>
            
      <SingleColumnBox>
        
      
    <DefaultReadOnlyTextField 
        value={transactionPayInResponseDto?.id?.toString()}
        label="Id" />

    <DefaultReadOnlyTextField 
        value={transactionPayInResponseDto?.firstName?.toString()}
        label="First Name" />

    <DefaultReadOnlyTextField 
        value={transactionPayInResponseDto?.lastName?.toString()}
        label="Last Name" />

    <DefaultReadOnlyTextField 
        value={transactionPayInResponseDto?.email?.toString()}
        label="Email" />

    <DefaultReadOnlyTextField 
        value={transactionPayInResponseDto?.authId?.toString()}
        label="Auth Id" />

    <DefaultReadOnlyTextField 
        value={transactionPayInResponseDto?.createdAt?.toString()}
        label="Created At" />
      </SingleColumnBox>
        </LoadableCardWrapper>
    )
}

export default DetailsTransactionPayInResponseDtoBody;