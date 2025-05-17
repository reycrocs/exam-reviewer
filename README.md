# Exam Reviewer

A modern web application built with React and TypeScript for reviewing and managing exams. This application provides a user-friendly interface for exam preparation and review.

## Features

- Interactive exam review interface
- Secure exam storage with encryption
- Drawing capabilities for visual notes
- Color customization options
- Responsive design for all devices
- Modern UI with Tailwind CSS

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Additional Libraries**:
  - React Sketch Canvas for drawing
  - Canvas Confetti for celebrations
  - Crypto-js for encryption
  - React Color for color picker
  - Font Awesome for icons
  - Lucide React for additional icons

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd exam-reviewer
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── assets/         # Static assets
├── context/        # React context providers
├── encryptedExams/ # Encrypted exam data
├── helpers/        # Helper functions
├── store/          # Redux store configuration
├── utils/          # Utility functions
├── views/          # React components and pages
└── main.tsx        # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
