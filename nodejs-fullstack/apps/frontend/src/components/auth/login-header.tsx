import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#0F1626'
  },
  leading: {
    color: '#0F1626'
  }
})

export const LoginHeader = () => (
  <hgroup {...stylex.props(styles.container)}>
    <header {...stylex.props(styles.header)}>Welcome back</header>
    <p {...stylex.props(styles.leading)}>Enter your details to login</p>
  </hgroup>
)
