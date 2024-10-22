import { defineNuxtModule, addPlugin, createResolver, installModule, addTemplate } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  // Define the properties for ModuleOptions here
  theme?: string
  darkMode?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'DaisyUI',
    configKey: 'daisyui',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Ensure @nuxtjs/tailwindcss is included as a dependency
    await installModule('@nuxtjs/tailwindcss')

    // Add custom template files
    addTemplate({
      src: resolver.resolve('./templates/tailwind.config.ts'),
      filename: 'tailsind.config.ts',
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
