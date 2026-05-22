import type { StorybookConfig } from '@storybook/react-vite'

const GITHUB_PAGES_BASE = '/vds-color-v2-storybook/'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  viteFinal: async (config, { configType }) => {
    if (configType === 'PRODUCTION') {
      config.base = GITHUB_PAGES_BASE
    }
    return config
  },
}

export default config
