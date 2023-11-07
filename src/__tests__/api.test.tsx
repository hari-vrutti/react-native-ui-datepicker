import React from 'react';
import { render, screen } from '@testing-library/react-native';
import DateTimePicker from '../DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/tr';

describe('API TESTS', () => {
  test('should display the passed date', () => {
    const selectedDate = new Date();
    const month = selectedDate.toLocaleString('en-US', { month: 'long' });

    render(<DateTimePicker value={selectedDate} />);
    expect(screen.getByText(month)).toBeVisible();
  });
});
