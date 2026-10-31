import { render } from '@testing-library/react'
import { test, expect } from 'vitest'

test('renders correctly', () => {
  const { container } = render(<div>Next.js</div>)
  expect(container.textContent).toBe('Next.js')
})
