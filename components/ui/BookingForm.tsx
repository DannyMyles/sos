// components/BookingForm.tsx
'use client'

import { useState } from 'react'

const BookingForm = () => {
  const [formData, setFormData] = useState({
    activity: '',
    date: '',
    time: '',
    participants: 1,
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  const activities = [
    { id: 'hiking', name: 'Mountain Hiking' },
    { id: 'running', name: 'Trail Running' },
    { id: 'climbing', name: 'Rock Climbing' },
    { id: 'kayaking', name: 'Kayaking' },
    { id: 'yoga', name: 'Outdoor Yoga' },
    { id: 'biking', name: 'Mountain Biking' },
    { id: 'survival', name: 'Wilderness Survival' },
    { id: 'photography', name: 'Nature Photography' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Booking submitted:', formData)
    alert('Booking request submitted successfully!')
    setFormData({
      activity: '',
      date: '',
      time: '',
      participants: 1,
      name: '',
      email: '',
      phone: '',
      notes: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value) || 1 : value
    }))
  }

  return (
    <div className="adventure-card">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Booking</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Activity *
          </label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="">Choose an activity</option>
            {activities.map(activity => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Select time</option>
              <option value="06:00">06:00 AM</option>
              <option value="07:00">07:00 AM</option>
              <option value="08:00">08:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="16:00">04:00 PM</option>
              <option value="17:00">05:00 PM</option>
              <option value="18:00">06:00 PM</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Participants *
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ 
                ...prev, 
                participants: Math.max(1, prev.participants - 1) 
              }))}
              className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <input
              type="number"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              min="1"
              max="20"
              className="w-full px-4 py-3 border-t border-b border-gray-300 text-center focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ 
                ...prev, 
                participants: Math.min(20, prev.participants + 1) 
              }))}
              className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Any special requirements or questions..."
          />
        </div>
        
        <button
          type="submit"
          className="btn-adventure w-full py-4 text-lg"
        >
          Book Now
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          You'll receive a confirmation email within 24 hours. 
          For same-day bookings, please call us directly.
        </p>
      </form>
    </div>
  )
}

export default BookingForm