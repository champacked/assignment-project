## Component Structure

### Core Components

- **App**: Main application container with theme provider and routing
- **Navigation**: Responsive navigation bar with mobile drawer
- **Counter**: Interactive counter with animated background
- **UserForm**: Form with validation and unsaved changes detection
- **RichTextEditor**: Rich text editor using React-Quill
- **Profile**: User profile display with responsive layout

### Authentication Components

- **SignIn**: User login form
- **SignUp**: User registration form
- **PrivateRoute**: Route protection for authenticated users

## State Management

### Redux Store Structure

- **authSlice**: Manages authentication state
  - User information
  - Authentication status
  - Login/logout functionality
- **userSlice**: Manages user data
  - User profiles
  - Form submissions

### Key State Management Decisions

1. **Redux Toolkit**: Used for simplified Redux setup with slices
2. **Local Storage Persistence**: Auth state and user data persisted in localStorage
3. **Mock Authentication**: Simulated auth flow with mock backend
4. **Form State Management**: Local React state for forms with Redux for submission

## UI Framework

- **Material UI**: Primary component library with custom theme
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Tailwind CSS**: Used for utility classes and additional styling

## Routing

- **React Router v6**: For navigation with private routes
- **Navigation Guards**: Prevents leaving forms with unsaved changes

## Project Structure

```
src/
├── components/       # UI components
│   ├── auth/         # Authentication components
│   └── ...           # Feature components
├── store/            # Redux store setup
│   ├── authSlice.ts  # Authentication state
│   └── userSlice.ts  # User data state
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```
