import React from 'react'
import { render } from 'react-dom'
import DatePickerExample from './examples/DatePickerExample'
import DateRangePickerExample from './examples/DateRangePickerExample'
import DatePickerCalendarExample from './examples/DatePickerCalendarExample'
import DateRangePickerCalendarExample from './examples/DateRangePickerCalendarExample'
import StandaloneInputExample from './examples/StandaloneInputExample'
import DatePickerCalendarWithInputExample from './examples/DatePickerCalendarWithInputExample'
import ModifiersExample from './examples/ModifiersExample'
import LocalesExample from './examples/LocalesExample'
import CalendarExample from './examples/CalendarExample'
import CodeBlock from './CodeBlock'
import DatePickerWithTimeInputExample from './examples/DatePickerWithTimeInputExample'
import DatePickerWithTimeExample from './examples/DatePickerWithTimeExample'

function App() {
  return (
    <div className='container'>
      <p>
        <code>DatePickerCalendar</code> example:
      </p>
      <DatePickerCalendarExample />
    </div>
  )
}

if (module.hot) {
  module.hot.accept()
}

render(<App />, document.getElementById('root'))
