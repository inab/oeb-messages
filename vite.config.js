import { defineConfig } from 'vite'
import path from "path";

export default defineConfig ({
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: path.resolve(__dirname, "main.js"),
            name: "oeb-messages",
            fileName: (format) => `oeb-messages.${format}.js`,
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: []
        },
    },
})