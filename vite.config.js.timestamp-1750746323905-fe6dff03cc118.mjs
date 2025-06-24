// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///home/kavin/github/personal-website/node_modules/.pnpm/vite@5.4.19_@types+node@24.0.3_sass@1.89.2_terser@5.43.1/node_modules/vite/dist/node/index.js";
import preact from "file:///home/kavin/github/personal-website/node_modules/.pnpm/@preact+preset-vite@2.10.1_@babel+core@7.27.4_preact@10.26.9_vite@5.4.19_@types+node@24.0.3_sass@1.89.2_terser@5.43.1_/node_modules/@preact/preset-vite/dist/esm/index.mjs";
var vite_config_default = defineConfig({
  plugins: [preact()],
  css: {
    devSourcemap: true
  },
  build: {
    outDir: resolve(process.cwd(), "dist"),
    emptyOutDir: false,
    sourcemap: "hidden",
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "src/assets/scripts/main.js")
      },
      output: {
        assetFileNames: "assets/styles/[name].[hash].css",
        chunkFileNames: "assets/scripts/[name].[hash].js",
        entryFileNames: "assets/scripts/[name].[hash].js"
      }
    }
  },
  resolve: {
    alias: {
      "@assets": resolve(process.cwd(), "src/assets")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rYXZpbi9naXRodWIvcGVyc29uYWwtd2Vic2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUva2F2aW4vZ2l0aHViL3BlcnNvbmFsLXdlYnNpdGUvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUva2F2aW4vZ2l0aHViL3BlcnNvbmFsLXdlYnNpdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcHJlYWN0IGZyb20gJ0BwcmVhY3QvcHJlc2V0LXZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW3ByZWFjdCgpXSxcbiAgICBjc3M6IHtcbiAgICAgICAgZGV2U291cmNlbWFwOiB0cnVlXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXI6IHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2Rpc3QnKSxcbiAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgICAgICBzb3VyY2VtYXA6ICdoaWRkZW4nLFxuICAgICAgICBtYW5pZmVzdDogdHJ1ZSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBtYWluOiByZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3NjcmlwdHMvbWFpbi5qcycpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvc3R5bGVzL1tuYW1lXS5baGFzaF0uY3NzJyxcbiAgICAgICAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9zY3JpcHRzL1tuYW1lXS5baGFzaF0uanMnLFxuICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL3NjcmlwdHMvW25hbWVdLltoYXNoXS5qcydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0Bhc3NldHMnOiByZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzJylcbiAgICAgICAgfVxuICAgIH1cbn0pICJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlIsU0FBUyxlQUFlO0FBQ25ULFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUVuQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsRUFDbEIsS0FBSztBQUFBLElBQ0QsY0FBYztBQUFBLEVBQ2xCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFRLFFBQVEsUUFBUSxJQUFJLEdBQUcsTUFBTTtBQUFBLElBQ3JDLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLFVBQVU7QUFBQSxJQUNWLGVBQWU7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNILE1BQU0sUUFBUSxRQUFRLElBQUksR0FBRyw0QkFBNEI7QUFBQSxNQUM3RDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsV0FBVyxRQUFRLFFBQVEsSUFBSSxHQUFHLFlBQVk7QUFBQSxJQUNsRDtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
