
interface Props {
    newTagDto: NewTagDto | undefined;
    isLoading: boolean;
}

export const DetailsTagBody: React.FC<Props> = ({ newTagDto, isLoading }) => {
    return (
        <LoadableCardWrapper isLoading={isLoading}>
            
    <DoubleColumnBox>
        
      
    </DoubleColumnBox>
        </LoadableCardWrapper>
    )
}
