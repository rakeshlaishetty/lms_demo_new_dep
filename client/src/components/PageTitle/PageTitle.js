import React, { useState } from "react";
import { Button } from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();
  const [isAddOn, setIsAddOn] = useState(false);
  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      
      {props.button && (
        
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => {
            props.handleClick();
            setIsAddOn(!isAddOn);
          }}
        >
          {isAddOn == false ? props.button : "Close"}
        </Button>
      )}
    </div>
  );
}
