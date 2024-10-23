# LearnBySub – Enhance Your English Vocabulary with Movies & TV Shows

## Status

🚧 **In Progress**: The main functionality is not ready yet.
**Live Demo**: A link to the live version of the project will be available here once the project is ready for production.

**Technologies**: Next.js, React, TypeScript, Node.js

## Project Purpose

This project aims to:

- Act as a **portfolio project** that showcases my abilities in Next.js and other modern technologies.
- Serve as a **learning tool** for improving English skills, especially for those preparing to watch English-language content.
- Potentially be launched as a **production-ready service** in the future to help improv English and other languages.

## Project Overview

This is my first project built with **Next.js**, designed as part of my portfolio to help me learn the technology and demonstrate my skills to potential employers.

The project focuses on helping users improve their English by preparing them for watching movies or TV shows. It addresses a common problem: while someone’s general English level may be sufficient for watching films, certain unfamiliar words, phrasal verbs, or idioms may appear that are hard to understand from the context alone. Usually, this requires pausing the video and searching for definitions, which disrupts the flow.

With this service, users can review and learn the rarest words, phrases, and idioms from various movies and TV shows _before_ watching them. After several repetitions, these terms are memorized and added to the user's personal vocabulary as _learned_. Once memorized, they won’t be included in the unfamiliar words list again.

## Key Features

- **Review rare words, phrasal verbs, and idioms**: Learn uncommon terms that you are likely to encounter in movies and TV shows.
- **User vocabulary tracking**: Terms you’ve mastered are stored in your personal dictionary and won't be repeated.
- **Progressive filtering**: At first, many words you already know might appear, but as you use the service, your vocabulary will fill up, and only unfamiliar terms will be shown.
- **Preparation for watching content**: Get prepared for an uninterrupted viewing experience by learning the vocabulary beforehand.

## Technologies Used

- **Next.js**: A React-based framework with server-side rendering capabilities, ideal for building production-ready applications.
- **React**: A popular library for building user interfaces.
- **TypeScript**: For improved code quality and error handling.
- **Node.js**: Backend service for managing vocabulary data and serving the web application.
- **i18n and i18nexus**: For internationalization.

## How to Run Locally

> **Note**: The part of the code responsible for subtitle analysis is closed-source, so the application will not fully function without those resources.

### Prerequisites

For correct authentication to work locally, you need to:

1. Ensure the application runs on port 80.
2. Modify your `hosts` file by mapping `localhost:80` to a custom domain (e.g., `myapp.local`). This is necessary for authentication services running locally.
3. Refer to the documentation of your authentication providers (Google, Telegram, etc.) for detailed setup instructions.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/learnbysub.git
   ```

2. Navigate into the project directory:
   ```bash
   cd learnbysub
   ```
3. Create an .env.local file in the root directory with the following environment variables:

   ```bash
    # MongoDB
    DB_PASSWORD=your-database-password
    DB_USER=your-database-user
    DB_NAME=your-database-name

    # Settings

    HOSTURL=your-host-url # (For local, use the custom domain from your hosts file)

    # Integrations

    OPENSUBTOKEN=your-opensubtitles-api-token
    TMDB_TOKEN=your-tmdb-api-token

    # Auth

    AUTH_SECRET=your-randomly-generated-secret
    AUTH_URL=${HOSTURL}api/auth # Keep this as is
    AUTH_GOOGLE_ID=your-google-auth-id
    AUTH_GOOGLE_SECRET=your-google-auth-secret
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token

    # Internationalization

    I18NEXUS_API_KEY=your-i18nexus-api-key
   ```

4. Install dependencies:

```bash
npm install

```

5. Run the development server:
   ```bash
   sudo npm run dev
   ```
