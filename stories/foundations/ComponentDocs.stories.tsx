import type { Meta, StoryObj } from '@storybook/react'
import { AlertButtonRow } from '../../src/components/AlertButton'
import { CheckboxMatrix } from '../../src/components/Checkbox'
import { BeforeAfter } from '../../src/components/BeforeAfter'

const meta: Meta = {
  title: 'Foundations/Color v2/Component Docs',
}

export default meta

export const CheckboxOnSurface01: StoryObj = {
  render: () => <CheckboxMatrix tokenVariant="v2" />,
}

export const AlertButtonComparison: StoryObj = {
  render: () => (
    <BeforeAfter
      before={<AlertButtonRow tokenVariant="legacy" background="surface-01" />}
      after={<AlertButtonRow tokenVariant="v2" background="surface-01" />}
    />
  ),
}
