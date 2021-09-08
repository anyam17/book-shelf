import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Box,
  Container,
  Grid,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import AccountDetails from './AccountDetails';

const Account = (props) => ( 
  <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Card {...props}>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <img
                      className="rounded-circle"
                      src={`/images/1.jpg`}
                      alt={props.firstname}
                      width="110"
                    />
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h6"
                    >
                      {props.email}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {`${ _.startCase(props.firstname)} ${ _.startCase(props.lastname)}`}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      {`${moment().format('hh:mm A')}`}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    color="primary"
                    fullWidth
                    variant="text"
                  >
                    Upload picture
                  </Button>
                </CardActions>
              </Card>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          > 
            <AccountDetails {...props} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;