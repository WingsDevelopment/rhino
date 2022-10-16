
interface Props {
    updateBrandDto: UpdateBrandDto;
    isLoading: boolean;
}

export const DetailsUpdateBrandDtoBody: React.FC<Props> = ({ updateBrandDto, isLoading }) => {
    return (
        <LoadableCardWrapper isLoading={isLoading}>
            
      <SingleColumnBox>
        
      
    <DefaultReadOnlyTextField 
        value={updateBrandDto?.id?.toString()}
        label="Id" />

    <DefaultReadOnlyTextField 
        value={updateBrandDto?.firstName?.toString()}
        label="First Name" />

    <DefaultReadOnlyTextField 
        value={updateBrandDto?.lastName?.toString()}
        label="Last Name" />

    <DefaultReadOnlyTextField 
        value={updateBrandDto?.email?.toString()}
        label="Email" />

    <DefaultReadOnlyTextField 
        value={updateBrandDto?.authId?.toString()}
        label="Auth Id" />

    <DefaultReadOnlyTextField 
        value={updateBrandDto?.createdAt?.toString()}
        label="Created At" />
      </SingleColumnBox>
        </LoadableCardWrapper>
    )
}

export default DetailsUpdateBrandDtoBody;