import React, { memo, useMemo } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { ClassNames, CalendarDay, Styles, Components } from '../types';
import { CONTAINER_HEIGHT, WEEKDAYS_HEIGHT } from '../enums';
import { cn } from '../utils';
import { isEqual } from 'lodash';

interface Props {
  day: CalendarDay;
  onSelectDate: (date: string) => void;
  containerHeight?: number;
  weekdaysHeight?: number;
  styles?: Styles;
  classNames?: ClassNames;
  components?: Components;
}

export const EmptyDay = React.memo(() => {
  return <View style={defaultStyles.dayWrapper} />;
});

const Day = ({
  day,
  onSelectDate,
  containerHeight = CONTAINER_HEIGHT,
  weekdaysHeight = WEEKDAYS_HEIGHT,
  styles = {},
  classNames = {},
  components = {},
}: Props) => {
  const style = useMemo(
    () => createDefaultStyles(containerHeight, weekdaysHeight),
    [containerHeight, weekdaysHeight]
  );

  const {
    text,
    date,
    isDisabled,
    isCurrentMonth,
    isToday,
    isSelected,
    inRange,
    leftCrop,
    rightCrop,
    isStartOfWeek,
    isEndOfWeek,
    isCrop,
    inMiddle,
    rangeStart,
    rangeEnd,
  } = day;

  const containerStyle = StyleSheet.flatten([
    defaultStyles.dayContainer,
    styles.day,
    isToday && styles.today,
    !isCurrentMonth && styles.outside,
    isSelected && styles.selected,
    isDisabled && styles.disabled,
    inMiddle && styles.range_middle,
    rangeStart && styles.range_start,
    rangeEnd && styles.range_end,
  ]);

  const textStyle = StyleSheet.flatten([
    styles.day_label,
    isToday && styles.today_label,
    !isCurrentMonth && styles.outside_label,
    isSelected && styles.selected_label,
    isDisabled && styles.disabled_label,
    inMiddle && styles.range_middle_label,
    rangeStart && styles.range_start_label,
    rangeEnd && styles.range_end_label,
  ]);

  const containerClassName = cn(
    classNames.day,
    isToday && classNames.today,
    !isCurrentMonth && classNames.outside,
    isSelected && classNames.selected,
    isDisabled && classNames.disabled,
    inMiddle && classNames.range_middle,
    rangeStart && classNames.range_start,
    rangeEnd && classNames.range_end
  );

  const textClassName = cn(
    classNames.day_label,
    isToday && classNames.today_label,
    !isCurrentMonth && classNames.outside_label,
    isSelected && classNames.selected_label,
    isDisabled && classNames.disabled_label,
    inMiddle && classNames.range_middle_label,
    rangeStart && classNames.range_start_label,
    rangeEnd && classNames.range_end_label
  );

  const RangeFill = useMemo(() => {
    if (!inRange) return null;
    if (!isCrop) {
      return (
        <View
          style={[
            defaultStyles.rangeRoot,
            styles.range_fill,
            isEndOfWeek && styles.range_fill_weekend,
            isStartOfWeek && styles.range_fill_weekstart,
          ]}
          className={cn(
            classNames.range_fill,
            isEndOfWeek && classNames.range_fill_weekend,
            isStartOfWeek && classNames.range_fill_weekstart
          )}
        />
      );
    }
    return (
      <>
        {leftCrop && (
          <View
            style={[
              defaultStyles.rangeRoot,
              { left: '50%' },
              styles.range_fill,
            ]}
            className={classNames.range_fill}
          />
        )}
        {rightCrop && (
          <View
            style={[
              defaultStyles.rangeRoot,
              { right: '50%' },
              styles.range_fill,
            ]}
            className={classNames.range_fill}
          />
        )}
      </>
    );
  }, [
    inRange,
    isCrop,
    leftCrop,
    rightCrop,
    defaultStyles.rangeRoot,
    styles.range_fill,
    styles.range_fill_weekstart,
    styles.range_fill_weekend,
    classNames.range_fill,
    classNames.range_fill_weekstart,
    classNames.range_fill_weekend,
  ]);

  return (
    <View style={defaultStyles.dayWrapper}>
      <View
        style={[style.dayCell, styles.day_cell]}
        className={classNames.day_cell}
      >
        {RangeFill}
        {components.Day ? (
          <Pressable
            disabled={isDisabled}
            onPress={() => onSelectDate(date)}
            accessibilityRole="button"
            accessibilityLabel={text}
            style={containerStyle}
          >
            {components.Day(day)}
          </Pressable>
        ) : (
          <Pressable
            disabled={isDisabled}
            onPress={() => onSelectDate(date)}
            accessibilityRole="button"
            accessibilityLabel={text}
            style={containerStyle}
            className={containerClassName}
          >
            <Text style={textStyle} className={textClassName}>
              {text}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  dayWrapper: {
    width: `${100 / 7}%`,
  },
  dayContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  rangeWrapper: {
    flex: 1,
  },
  rangeRoot: {
    position: 'absolute',
    top: 2,
    left: 0,
    right: 0,
    bottom: 2,
  },
});

const createDefaultStyles = (containerHeight: number, weekdaysHeight: number) =>
  StyleSheet.create({
    dayCell: {
      minHeight: (containerHeight - weekdaysHeight) / 6,
    },
  });

const customComparator = (prev: Readonly<Props>, next: Readonly<Props>) => {
  const areEqual =
    isEqual(prev.day, next.day) &&
    prev.onSelectDate === next.onSelectDate &&
    prev.containerHeight === next.containerHeight &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames) &&
    isEqual(prev.components, next.components);

  return areEqual;
};

export default memo(Day, customComparator);
