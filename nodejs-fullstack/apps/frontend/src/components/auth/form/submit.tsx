import { Button } from '@/components/button'
import { Font } from '@/components/font'
import { Typography } from '@/components/typography'
import * as stylex from '@stylexjs/stylex'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from 'lucide-react'
import { Control } from './control'

const styles = stylex.create({
  submit: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  }
})

export const Submit = () => (
  <Control>
    <Button type="submit" stylexStyles={styles.submit}>
      <Typography.SemiboldType14>
        <Font.Body>Continue</Font.Body>
      </Typography.SemiboldType14>
      <ArrowRightIcon />
    </Button>
  </Control>
)
