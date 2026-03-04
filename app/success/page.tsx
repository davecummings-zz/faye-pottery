import Link from 'next/link'
import { Suspense } from 'react'
import SuccessContent from './success-content'

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
