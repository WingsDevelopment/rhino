
interface Props {
    posUserDto: PosUserDto;
    isLoading: boolean;
}

export const DetailsPosUserDtoBody: React.FC<Props> = ({ posUserDto, isLoading }) => {
    return (
        <LoadableCardWrapper isLoading={isLoading}>
            
      <SingleColumnBox>
        
      
    <DefaultReadOnlyTextField 
        value={posUserDto.id}
        label="Id" />

    <DefaultReadOnlyTextField 
        value={posUserDto.firstName}
        label="First Name" />

    <DefaultReadOnlyTextField 
        value={posUserDto.lastName}
        label="Last Name" />

    <DefaultReadOnlyTextField 
        value={posUserDto.email}
        label="Email" />

    <DefaultReadOnlyTextField 
        value={posUserDto.authId}
        label="Auth Id" />

    <DefaultReadOnlyTextField 
        value={posUserDto.createdAt}
        label="Created At" />
      </SingleColumnBox>
        </LoadableCardWrapper>
    )
}

export default DetailsPosUserDtoBody;