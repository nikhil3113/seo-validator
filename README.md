# SEO Validator

## Overview
SEO Validator is a tool designed to help you analyze and optimize meta titles and descriptions for improved search engine performance. It ensures your metadata adheres to SEO best practices and provides real-time feedback on keyword usage and character limits.

---

## Features
- **Title & Description Validation**:
  - Ensures character limits are within recommended SEO ranges.
  - Highlights areas where improvements can be made.
- **Keyword Optimization**:
  - Verifies optimal keyword usage in titles and descriptions.
  - Provides suggestions to improve keyword placement.
- **Real-Time Feedback**:
  - Dynamic validation as you type.
  - Highlights errors and successes with visual cues.
- **Metadata Generation**:
  - Automatically generates AI based SEO-friendly meta titles and descriptions.
  - Includes recommendations for keyword integration.

---

## Tech Stack
- **Frontend**:
  - React.js (with Next.js)
  - TypeScript
  - Tailwind CSS
- **Backend**:
  - Next.js Server-Side Rendering (SSR)
  - NextAuth for authentication
- **State Management**:
  - Recoil

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/seo-validator.git
   cd seo-validator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   GOOGLE_ANALYTICS_ID=G-XXXXXXX
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Visit the application:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage
1. **Manual Metadata Check**:
   - Navigate to the **Manual Check** page.
   - Enter your title and description.
   - Review the character count and keyword optimization feedback.

2. **URL Metadata Check**:
   - Navigate to the **URL Check** page.
   - Enter a URL to fetch and validate its metadata.

3. **Generate Metadata**:
   - Use the "Generate Meta Data" button to create SEO-optimized titles and descriptions based on your input.

---

## Development

### Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Start the production server.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

---

## Future Scope
Token based model

---

