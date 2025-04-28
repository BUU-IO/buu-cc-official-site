module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},      // 关键：处理 @import 指令
    autoprefixer: {},
  }
}