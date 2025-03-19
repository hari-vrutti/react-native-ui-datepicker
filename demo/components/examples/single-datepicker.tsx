import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateType } from '../ui/calendar';
import dayjs from 'dayjs';
import { DateInput } from '../date-input';

export default function SingleDatePicker() {
  const [date, setDate] = useState<DateType>();
  const [doneDate, setDoneDate] = useState<DateType[]>(['2025-03-18']);

  return (
    <View className="flex-1 gap-4">
      <Calendar
        mode="single"
        date={date}
        onChange={({ date }) => setDate(date)}
        timePicker
        doneDate={doneDate}
        //use12Hours
        //minDate={new Date()}
        //maxDate={new Date(new Date().getFullYear(), 11, 31)} // end of the year
      />
      <TouchableOpacity
        onPress={() => {
          const yesterday = dayjs(doneDate[0])
            .subtract(1, 'day')
            .format('YYYY-MM-DD');
          setDoneDate([yesterday]);
        }}
      >
        <View className="rounded-md bg-blue-500 p-3">
          <Text className="text-center font-medium text-white">
            Set to Yesterday
          </Text>
        </View>
      </TouchableOpacity>
      <DateInput
        value={date ? dayjs(date).format('MMMM DD, YYYY HH:mm') : null}
        placeholder="Pick a date"
      />
    </View>
  );
}
