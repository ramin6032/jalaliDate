import "@testing-library/jest-dom";

// Mock Date.now() to return a fixed timestamp
const mockDate = new Date("2024-03-19T12:00:00Z");
jest.spyOn(global, "Date").mockImplementation(() => mockDate);

// Mock console.error to prevent error messages in tests
console.error = jest.fn();

// Mock console.warn to prevent warning messages in tests
console.warn = jest.fn();
