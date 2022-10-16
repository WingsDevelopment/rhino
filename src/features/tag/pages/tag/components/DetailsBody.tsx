
interface Props {
    tag: Tag;
    isLoading: boolean;
}

export const DetailsTagBody: React.FC<Props> = ({ tag, isLoading }) => {
    return (
        <LoadableCardWrapper isLoading={isLoading}>
            
      <SingleColumnBox>
        
      
    <DefaultReadOnlyTextField 
        value={tag.id}
        label="Id" />

    <DefaultReadOnlyTextField 
        value={tag.firstName}
        label="First Name" />

    <DefaultReadOnlyTextField 
        value={tag.lastName}
        label="Last Name" />

    <DefaultReadOnlyTextField 
        value={tag.email}
        label="Email" />

    <DefaultReadOnlyTextField 
        value={tag.authId}
        label="Auth Id" />

    <DefaultReadOnlyTextField 
        value={tag.createdAt}
        label="Created At" />
      </SingleColumnBox>
        </LoadableCardWrapper>
    )
}

export default DetailsTagBody;