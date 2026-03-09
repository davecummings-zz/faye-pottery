'use client'

import { ANNOUNCEMENT } from '@/lib/announcement'

export default function AnnouncementBar() {
  if (!ANNOUNCEMENT.ENABLED) {
    return null
  }

  return (
    <div className="w-full bg-glaze text-white text-center py-3 px-4">
      <p className="text-sm font-semibold">
        {ANNOUNCEMENT.TEXT}
      </p>
    </div>
  )
}
