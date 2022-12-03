import React from 'react'
import { bool, instanceOf, func, number, object, objectOf, string } from 'prop-types'
import { eachDayOfInterval, isSameMonth, lightFormat, startOfMonth, startOfWeek } from 'date-fns'
import classNames from 'classnames'
import useGrid from './useGrid'
import { ORIGIN_BOTTOM, ORIGIN_TOP } from './constants'
import CalendarDay from './CalendarDay'

const computeModifiers = (modifiers, date) => {
  const computedModifiers = {}

  Object.keys(modifiers).map(key => {
    computedModifiers[key] = modifiers[key](date)
  })

  return computedModifiers
}

export default function CalendarGrid({
  locale,
  month,
  modifiers,
  modifiersClassNames,
  onMonthChange,
  onDayHover,
  onDayClick,
  transitionDuration,
  touchDragEnabled,
  containMinAndMaxDates
}) {
  let monthStartValue

  if (containMinAndMaxDates) {
    monthStartValue = startOfWeek(month)
  } else {
    monthStartValue = startOfMonth(month)
  }

  const grid = useGrid({ locale, month: monthStartValue, onMonthChange, transitionDuration, touchDragEnabled, containMinAndMaxDates })
  const { startDate, endDate, cellHeight, containerElementRef, isWide, offset, origin, transition } = grid

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  }).map(date => {
    return (
      <CalendarDay
        date={date}
        height={cellHeight}
        key={lightFormat(date, 'yyyy-MM-dd')}
        locale={locale}
        modifiers={{
          ...computeModifiers(modifiers, date),
          outside: !isSameMonth(date, month),
          wide: isWide
        }}
        modifiersClassNames={modifiersClassNames}
        onHover={onDayHover}
        onClick={onDayClick}
      />
    )
  })

  return (
    <div className='nice-dates-grid' style={{ height: cellHeight * 6 }}>
      <div
        className={classNames('nice-dates-grid_container', {
          '-moving': offset,
          '-origin-bottom': origin === ORIGIN_BOTTOM,
          '-origin-top': origin === ORIGIN_TOP,
          '-transition': transition
        })}
        ref={containerElementRef}
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          transitionDuration: `${transitionDuration}ms`
        }}
      >
        {days}
      </div>
    </div>
  )
}

CalendarGrid.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  onMonthChange: func.isRequired,
  onDayHover: func,
  onDayClick: func,
  transitionDuration: number.isRequired,
  touchDragEnabled: bool,
  containMinAndMaxDates: bool
}

CalendarGrid.defaultProps = {
  modifiers: {},
  transitionDuration: 500,
  touchDragEnabled: true,
  containMinAndMaxDates: false
}
