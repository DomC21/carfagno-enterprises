import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export function PhoneForm() {
  const [phone, setPhone] = useState('')
  
  return (
    <form className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number for SMS Alerts
        </label>
        <Input
          type="tel"
          placeholder="(555) 555-5555"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-gray-800"
        />
      </div>
      <Button type="submit" className="w-full">
        Continue to Payment
      </Button>
    </form>
  )
}
