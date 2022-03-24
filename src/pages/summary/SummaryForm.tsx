import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  Popover,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { FC, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

type IOwnProps = {
  setOrderPhase: (phase: string) => void;
};

const SummaryForm: FC<IOwnProps> = ({ setOrderPhase }) => {
  const [tcChecked, setTcChecked] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  function handleSubmit(event: any) {
    event.preventDefault();

    // pass along to the next phase.
    // The next page will handle submitting order from context.
    setOrderPhase('completed');
  }

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const checkboxLabel = (
    <>
      <span>I agree to</span>
      <Typography
        style={{ display: 'inline' }}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </Typography>
    </>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={tcChecked}
                onChange={(e: any) => setTcChecked(e.target.checked)}
                name="checkedB"
                color="primary"
              />
            }
            label={checkboxLabel}
          />
        </div>
        <Button variant="outlined" type="submit" disabled={!tcChecked}>
          Confirm order
        </Button>
      </form>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>I will party responsibly</Typography>
      </Popover>
    </>
  );
};

export default SummaryForm;
