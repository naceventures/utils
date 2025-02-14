import { defineConfig } from 'tsup'
// import { dependencies } from './package.json'

export default defineConfig({
   entry: {
      index: 'src/index.ts',
   },
   outDir: 'dist',
   // platform: 'node',
   format: 'esm',
   bundle: true,
   // external: Object.keys(dependencies),
   minify: true,
   treeshake: true,
   dts: true,
   sourcemap: true,
   clean: true,
})
