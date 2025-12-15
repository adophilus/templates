import { useContext, type FunctionComponent } from 'react'
import * as stylex from '@stylexjs/stylex'
import { Typography } from '../typography'
import { Font } from '../font'
import { CloudUploadIcon } from 'lucide-react'
import { Context } from './context'

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    '--size': '4rem',
    width: 'var(--size)',
    height: 'var(--size)'
  }
})

export const Placeholder: FunctionComponent = () => {
  const { files } = useContext(Context)

  if (files.length) return null

  return (
    <div {...stylex.props(styles.container)}>
      <div>
        <CloudUploadIcon {...stylex.props(styles.icon)} />
      </div>
      <div>
        <Typography.MediumType12>
          <Font.Body>Drag a file in here or Click to select one</Font.Body>
        </Typography.MediumType12>
      </div>
    </div>
  )
}
