import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardComponent = (props) => {
  return (
    <div className="d-flex flex-row gap-3 flex-wrap ">
      {props.data.map((card) => {
        return (
          <Card
            sx={{
              minWidth: 250,
              maxWidth: 350,
              mt: 5,
              mb: 5,
              textTransform: "capitalize",
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={card.Image}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="subtitle2"
                fontSize="18px"
                fontWeight="bold"
                component="div"
              >
                {card.CardTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.CardParagraph}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <a href={card.Cardlink}> Know More </a>
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default CardComponent;
