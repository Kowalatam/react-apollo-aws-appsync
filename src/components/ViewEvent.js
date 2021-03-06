import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UpdateEvent from './UpdateEvent';
import Loading from './Loading';
import cover from '../utils/cover';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  withStyles,
  Grid,
} from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';
import dayjs from 'dayjs';

const GET_EVENT = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      when
      where
      description
    }
  }
`;

const styles = () => ({
  wrapper: {
    backgroundColor: '#fff',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  form: {
    padding: 16,
  },
});

function ViewEvent({ eventId, classes }) {
  return (
    <Query query={GET_EVENT} variables={{ id: eventId }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <p>Error :(</p>;
        const { name, when, where, description } = data.getEvent;
        return (
          <div className={classes.wrapper}>
            <Card elevation={0}>
              <CardHeader
                title={name}
                subheader={dayjs(when).format('ddd, MMM D, YYYY HH:mm')}
              />
              <CardMedia className={classes.media} image={cover(name)} />
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  style={{ marginBottom: 16 }}
                >
                  <PlaceIcon
                    color="action"
                    fontSize="small"
                    style={{ marginLeft: -4, marginRight: 4 }}
                  />
                  <Typography variant="body2">{where}</Typography>
                </Grid>
                <Typography variant="body1">{description}</Typography>
              </CardContent>
            </Card>
            <div className={classes.form}>
              <UpdateEvent data={data.getEvent} />
            </div>
          </div>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(ViewEvent);
