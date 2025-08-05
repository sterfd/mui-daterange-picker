/* eslint-disable object-curly-newline */
import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {differenceInCalendarMonths, format} from 'date-fns';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import {
  DateRange,
  DefinedRange,
  Setter,
  NavigationAction,
} from '../types';
import { MARKERS } from './Markers';

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    // eslint-disable-next-line no-unused-vars
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    // eslint-disable-next-line no-unused-vars
    onDayClick: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onDayHover: (day: Date) => void;
    // eslint-disable-next-line no-unused-vars
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };
  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
        <Divider orientation="vertical" flexItem/>
        <Grid>
          <Grid container sx={{ padding: '20px 70px' }} alignItems="center">
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">
                {startDate ? format(startDate, 'dd MMMM yyyy', {locale}) : 'Start Date'}
              </Typography>
            </Grid>
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              <ArrowRightAlt color="action" />
            </Grid>
            <Grid sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, 'dd MMMM yyyy', {locale}) : 'End Date'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />
            <Divider orientation="vertical" flexItem/>
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
