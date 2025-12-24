// components/Calendar.tsx
'use client'

import { useState, useEffect } from 'react'

interface CalendarEvent {
  id: number
  title: string
  date: Date
  startTime: string
  endTime: string
  type: string
  difficulty: string
  spots: number
  booked: number
  guide: string
}

interface CalendarProps {
  events: CalendarEvent[]
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  const [filterType, setFilterType] = useState<string>('all')

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Navigate to today
  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  // Get events for specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear() &&
      (filterType === 'all' || event.type === filterType)
    )
  }

  // Render month view
  const renderMonthView = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    
    const days = []
    const today = new Date()

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      const prevDate = new Date(year, month, -i)
      days.unshift({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        events: []
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        events: getEventsForDate(date)
      })
    }

    // Next month days
    const totalCells = 42 // 6 weeks
    while (days.length < totalCells) {
      const nextDate:any = new Date(year, month + 1, days.length - daysInMonth - firstDay + 1)
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        events: []
      })
    }

    // Split into weeks
    const weeks = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    return weeks.map((week, weekIndex) => (
      <tr key={weekIndex}>
        {week.map((day, dayIndex) => (
          <td
            key={dayIndex}
            className={`
              border border-gray-200 p-2 h-32 align-top
              ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
              ${day.isToday ? 'ring-2 ring-accent' : ''}
              ${selectedDate.getTime() === day.date.getTime() ? 'bg-accent/10' : ''}
              hover:bg-gray-50 cursor-pointer transition-colors
            `}
            onClick={() => setSelectedDate(day.date)}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-1">
                <span className={`
                  font-medium
                  ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${day.isToday ? 'font-bold text-accent' : ''}
                `}>
                  {day.date.getDate()}
                </span>
                {day.events.length > 0 && (
                  <span className="text-xs bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {day.events.length}
                  </span>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-1">
                {day.events.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className={`
                      text-xs p-1 rounded truncate
                      ${event.type === 'hiking' ? 'bg-green-100 text-green-800' :
                        event.type === 'running' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'climbing' ? 'bg-red-100 text-red-800' :
                        event.type === 'water' ? 'bg-cyan-100 text-cyan-800' :
                        event.type === 'yoga' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'}
                    `}
                    title={event.title}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-xs opacity-75">{event.startTime}</div>
                  </div>
                ))}
                {day.events.length > 2 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{day.events.length - 2} more
                  </div>
                )}
              </div>
            </div>
          </td>
        ))}
      </tr>
    ))
  }

  // Render week view
  const renderWeekView = () => {
    const startOfWeek = new Date(selectedDate)
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
    
    const weekDays:any = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDays.push(date)
    }

    // Time slots
    const timeSlots = []
    for (let hour = 6; hour <= 20; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`)
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="w-24 border border-gray-200 bg-gray-50 p-2">Time</th>
              {weekDays.map((date:any, index:any) => (
                <th
                  key={index}
                  className={`
                    border border-gray-200 p-2
                    ${date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-50' : 'bg-white'}
                    ${date.getDate() === selectedDate.getDate() ? 'bg-accent/10' : ''}
                  `}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`
                      text-lg font-bold
                      ${date.getDate() === new Date().getDate() ? 'text-accent' : 'text-gray-700'}
                    `}>
                      {date.getDate()}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, timeIndex) => (
              <tr key={timeIndex}>
                <td className="border border-gray-200 bg-gray-50 p-2 text-sm text-gray-600 text-center">
                  {time}
                </td>
                {weekDays.map((date:any, dateIndex: any) => {
                  const hourEvents = events.filter(event => {
                    const eventHour = parseInt(event.startTime.split(':')[0])
                    const currentHour = parseInt(time.split(':')[0])
                    return (
                      event.date.getDate() === date.getDate() &&
                      event.date.getMonth() === date.getMonth() &&
                      event.date.getFullYear() === date.getFullYear() &&
                      eventHour === currentHour &&
                      (filterType === 'all' || event.type === filterType)
                    )
                  })
                  
                  return (
                    <td
                      key={dateIndex}
                      className={`
                        border border-gray-200 p-1 h-16
                        ${date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-50' : 'bg-white'}
                        hover:bg-gray-50
                      `}
                    >
                      {hourEvents.map(event => (
                        <div
                          key={event.id}
                          className={`
                            text-xs p-1 m-1 rounded
                            ${event.type === 'hiking' ? 'bg-green-100 text-green-800 border border-green-200' :
                              event.type === 'running' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                              event.type === 'climbing' ? 'bg-red-100 text-red-800 border border-red-200' :
                              'bg-gray-100 text-gray-800 border border-gray-200'}
                            cursor-pointer hover:opacity-90 transition-opacity
                          `}
                          title={`${event.title}\n${event.startTime} - ${event.endTime}`}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="text-xs opacity-75 truncate">{event.startTime} - {event.endTime}</div>
                        </div>
                      ))}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Get events for selected date
  const selectedDateEvents = getEventsForDate(selectedDate)

  return (
    <div className="calendar-container">
      {/* Calendar Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={goToToday}
            className="btn-adventure-outline px-4 py-2"
          >
            Today
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 min-w-[200px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 ${
                viewMode === 'month' 
                  ? 'bg-accent text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 ${
                viewMode === 'week' 
                  ? 'bg-accent text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
          </div>

          {/* Filter Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="all">All Activities</option>
            <option value="hiking">Hiking</option>
            <option value="running">Trail Running</option>
            <option value="climbing">Rock Climbing</option>
            <option value="water">Water Sports</option>
            <option value="yoga">Yoga</option>
            <option value="cycling">Cycling</option>
            <option value="educational">Educational</option>
          </select>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'month' ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <th key={day} className="border border-gray-200 bg-gray-50 p-3 text-gray-700 font-medium">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderMonthView()}
            </tbody>
          </table>
        </div>
      ) : (
        renderWeekView()
      )}

      {/* Selected Date Events */}
      {selectedDateEvents.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Events on {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric',
              year: 'numeric' 
            })}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                className="adventure-card p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${event.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      event.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      event.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'}
                  `}>
                    {event.difficulty}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Guide: {event.guide}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Available: {event.spots - event.booked}/{event.spots} spots</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-accent h-2 rounded-full" 
                    style={{ width: `${(event.booked / event.spots) * 100}%` }}
                  ></div>
                </div>
                
                <button className="btn-adventure w-full">
                  Book This Event
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar