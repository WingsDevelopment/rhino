
interface Props {
    productDto: ProductDto;
    isLoading: boolean;
}

export const DetailsProductDtoBody: React.FC<Props> = ({ productDto, isLoading }) => {
    return (
        <LoadableCardWrapper isLoading={isLoading}>
            
      <SingleColumnBox>
        
      
    <DefaultReadOnlyTextField 
        value={productDto.id}
        label="Id" />

    <DefaultReadOnlyTextField 
        value={productDto.firstName}
        label="First Name" />

    <DefaultReadOnlyTextField 
        value={productDto.lastName}
        label="Last Name" />

    <DefaultReadOnlyTextField 
        value={productDto.email}
        label="Email" />

    <DefaultReadOnlyTextField 
        value={productDto.authId}
        label="Auth Id" />

    <DefaultReadOnlyTextField 
        value={productDto.createdAt}
        label="Created At" />
      </SingleColumnBox>
        </LoadableCardWrapper>
    )
}

export default DetailsProductDtoBody;