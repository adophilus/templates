import { Button } from '@/components/button'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import * as stylex from '@stylexjs/stylex'
import { ArrowRightIcon } from 'lucide-react'

const styles = stylex.create({
  submit: {
    display: 'flex',
    justifyContent: "space-between"
  }
})

export const Submit = () => (
  <Button type="submit" stylexStyles={styles.submit}>
    <Typography.SemiboldType14>
      <Font.Body>Continue</Font.Body>
    </Typography.SemiboldType14>
    <ArrowRightIcon />
  </Button>
)
