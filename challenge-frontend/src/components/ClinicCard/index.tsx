import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
  name: string,
  address_type: string,
  lat: string,
  long:string,
  neighborhood:string,
  position: string 
}

export const ClinicCard = (props: Props) => {

  return (
    <div className={`clinic-card-${props.position}`}>
      <Card sx={{ minWidth: 400, minHeight: 90 }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {`${props.name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${props.address_type}, ${props.neighborhood} `}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${props.lat}, ${props.long} `}
          </Typography>
        </CardContent>
      </Card> 
    </div>
  )
}