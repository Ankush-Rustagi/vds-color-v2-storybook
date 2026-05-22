import type { Meta, StoryObj } from '@storybook/react'
import { SemanticTokenReference } from '../../src/components/SemanticTokenReference'
import {
  ColorPrimitivesReference,
  EffectsTokensReference,
  SizeTokensReference,
} from '../../src/components/SimpleTokenReference'
import { TokenMappingTable } from '../../src/components/TokenMappingTable'

const meta: Meta = {
  title: 'Reference/Token Tables',
  tags: ['!dev', '!autodocs'],
}

export default meta

export const SemanticTokens: StoryObj = {
  name: 'Semantic Colors',
  render: () => <SemanticTokenReference />,
}

export const ColorPrimitives: StoryObj = {
  render: () => <ColorPrimitivesReference />,
}

export const SizeTokens: StoryObj = {
  render: () => <SizeTokensReference />,
}

export const EffectsTokens: StoryObj = {
  render: () => <EffectsTokensReference />,
}

export const LegacyMapping: StoryObj = {
  render: () => <TokenMappingTable />,
}
