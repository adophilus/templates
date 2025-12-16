import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import { UploadIcon } from 'lucide-react'
import {
  Button as CButton,
  type ButtonProps as CButtonProps
} from '@/components/button'
import { forwardRef } from 'react'
import * as stylex from '@stylexjs/stylex'
import { breakpoint } from '@/styles/design/tokens.stylex'
import { Breakpoint } from '@/components/breakpoint'
import { UploadDialog } from './dialog'

export type ButtonProps = Omit<CButtonProps, 'children'>

const styles = stylex.create({
  buttonIcon: {
    width: { default: '1rem', [breakpoint.lg]: '1.5rem' },
    height: { default: '1rem', [breakpoint.lg]: '1.5rem' }
  },
  input: {
    width: '100%'
  }
})

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <UploadDialog>
        <CButton {...props} ref={ref}>
          <UploadIcon {...stylex.props(styles.buttonIcon)} />
          <Breakpoint
            lg={
              <Typography.SemiboldType16>
                <Font.Body>Upload</Font.Body>
              </Typography.SemiboldType16>
            }
          >
            <Typography.SemiboldType12>
              <Font.Body>Upload</Font.Body>
            </Typography.SemiboldType12>
          </Breakpoint>
        </CButton>
      </UploadDialog>
    )
  }
)
