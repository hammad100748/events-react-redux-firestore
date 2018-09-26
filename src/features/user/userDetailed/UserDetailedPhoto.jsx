import React from 'react'
import { Grid, Segment, Header, Image } from 'semantic-ui-react'

const UserDetailedPhoto = ({photos}) => {
  return (
    <Grid.Column width={12}>
          <Segment attached>
            <Header icon="image" content="Photos" />

            <Image.Group size="small">
              {photos &&
                photos.map(photo => {
                  return <Image src={photo.url} />;
                })}
            </Image.Group>
          </Segment>
        </Grid.Column>
  )
}

export default UserDetailedPhoto
