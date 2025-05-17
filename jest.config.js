const nextJest = require("next/jest");

// Membuat konfigurasi Jest berdasarkan Next.js
const createJestConfig = nextJest({
  dir: "./", // Pastikan path ini sesuai dengan struktur aplikasi Anda
});

const jestConfig = {
  testEnvironment: "jest-environment-jsdom", // Menggunakan jsdom sebagai test environment
  setupFilesAfterEnv: [
    "@testing-library/jest-dom", // Pastikan ini sudah benar
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(jestConfig);
