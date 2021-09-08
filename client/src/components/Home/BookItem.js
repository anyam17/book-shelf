import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    float: 'left',
    marginLeft: 10,
    marginBottom: 20
  },
  media: {
    height: 140,
  },
});

const BookItem = (book) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/contemplative-reptile.jpg"
              title={book.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {book.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {book.author}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Typography><strong>Price</strong></Typography>
            <Chip
              label={`$${book.price}`}
              variant="outlined"
              color="primary"
              size="small"
            />
            <Typography><strong>Pages</strong></Typography>
            <Chip
              label={book.pages}
              variant="outlined"
              color="secondary"
              size="small"
            />
            <IconButton aria-label="add to favorites" styles={{float: 'right'}}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share" styles={{float: 'right'}}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
    );
}

export default BookItem;