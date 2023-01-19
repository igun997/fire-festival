/** @type {import('next').NextConfig} */
/* global __DEV__ */
const withAntdLess = require('next-plugin-antd-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['hero-slider']);
const nextConfig = withAntdLess({
  modifyVars: {
    'primary-color': '#800000',
    'text-color': '#d09539',
    'text-color-secondary': '#B9AA96',
    'border-radius-base': '6px',
    'success-color': '#128C7E',
    'warning-color': '#FFB900',
    'error-color': '#E60023',
  },
  cssLoaderOptions: {
    mode: 'local',
    localIdentName:
      process.env.NODE_ENV !== 'production' ? '[local]--[hash:base64:4]' : '[hash:base64:8]', // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
    exportLocalsConvention: 'camelCase',
    exportOnlyLocals: false,
  },
});

module.exports = withPlugins([withBundleAnalyzer, nextConfig, withPWA, withTM], {
  nextjs: {
    localIdentNameFollowDev: true,
  },
  experimental: {
    outputStandalone: true,
  },
  webpack(config) {
    return config;
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
});
