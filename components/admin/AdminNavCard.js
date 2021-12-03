import NextLink from 'next/link';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

export default function AdminNavCard({
  categoryValue,
  categoryName,
  href,
  buttonText,
}) {
  return (
    <Card raised>
      <CardContent>
        <Typography variant="h1">{categoryValue}</Typography>
        <Typography>{categoryName}</Typography>
      </CardContent>
      <CardActions>
        <NextLink href={href} passHref>
          <Button size="small" color="primary">
            {buttonText}
          </Button>
        </NextLink>
      </CardActions>
    </Card>
  );
}
