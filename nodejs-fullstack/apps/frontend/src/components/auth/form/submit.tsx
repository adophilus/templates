import { Button, type ButtonProps } from '@/components/button'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import * as stylex from '@stylexjs/stylex'
import { ArrowRightIcon, Loader2Icon } from 'lucide-react'
import { Control } from './control'
import { forwardRef, useContext } from 'react'
import { Context } from './context'

const loadingAnimation = stylex.keyframes({
  to: {
    transform: 'rotate(360deg)'
  }
})

const styles = stylex.create({
  submit: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  submittingIcon: {
    animationName: loadingAnimation,
    animationTimingFunction: 'linear',
    animationDuration: '700ms',
    animationIterationCount: 'infinite'
  }
})

export const Submit = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ stylexStyles, ...props }, ref) => {
    const { form } = useContext(Context)

    return (
      <Control>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              {...props}
              disabled={!canSubmit || isSubmitting}
              stylexStyles={[stylexStyles, styles.submit]}
              ref={ref}
            >
              <Typography.SemiboldType14>
                <Font.Body>Continue</Font.Body>
              </Typography.SemiboldType14>
              {isSubmitting ? (
                <Loader2Icon {...stylex.props(styles.submittingIcon)} />
              ) : (
                <ArrowRightIcon />
              )}
            </Button>
          )}
        </form.Subscribe>
      </Control>
    )
  }
)
