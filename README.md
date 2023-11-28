# ZNet Quiz PG

Welcome to the ZNet Quiz PG repository! This is a quiz web application inspired by Zenpro from Zenius Education. It's built with modern technologies including Next.js, Xstate, Clerk, and Vercel Postgres. The app is designed to offer a seamless and interactive quiz experience, backed by robust state management and secure authentication.

## Key Features

- **Framework**: Next.js for a robust front-end experience.
- **State Management**: Xstate to handle complex state logic efficiently.
- **Authentication**: Integrated with Clerk for secure user authentication.
- **Database**: Utilizes Vercel Postgres for reliable data storage and management.
- **Deployment**: Hosted on Vercel for seamless deployment and scalability.

## Testing

This app employs two testing strategies:

1. **Jest**: For testing the machine logic and services.
2. **Playwright**: For model-based testing to ensure the UI works as expected.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dafex301/znet-quiz-pg.git
   ```

2. **Environment Setup**
   - Populate the `.env` file based on the `.env.example`.

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Testing the Application

### Jest Testing

- Create a test file in `/tests/jest/TEST_NAME.test.ts`.
- Run tests using:
  ```bash
  npm run test
  ```

### Playwright Testing

- Create a test file in `tests/playwright/TEST_NAME.spec.ts`.
- To run Playwright tests:
  ```bash
  npx playwright test
  ```
- For UI-based testing:
  ```bash
  npx playwright test --ui
  ```

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/dafex301/znet-quiz-pg/issues) for open issues or to open a new issue.
