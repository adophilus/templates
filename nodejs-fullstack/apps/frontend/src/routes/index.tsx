import { createFileRoute } from '@tanstack/react-router'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '20px'
  },
  button: {
    borderRadius: '18px',
    borderStyle: 'none',
    paddingBlock: '10px',
    paddingInline: '16px',
    backgroundColor: 'red',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600
  }
})

export default function App() {
  return (
  )
}

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div {...stylex.props(styles.container)}>
      <button {...stylex.props(styles.button)}>Click me</button>
    </div>
  )
}
