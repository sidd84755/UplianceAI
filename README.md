Component Hierarchy

- App (Root)
  ├─ Login (Public Route)
  └─ ProtectedRoute
     ├─ Dashboard
     │   ├─ Charts (Bar, Line, Pie)
     │   └─ User Stats List
     ├─ Userdata (Profile Editor)
     └─ Counter (Interactive Widget)
Key Component Responsibilities

1 - App.jsx

- Routing configuration
- Global theme provider
- Authentication context setup
- Layout management

2 - Login.jsx

- Google OAuth2 integration
- Token storage management
- Authentication state initialization

3 - Dashboard.jsx

- Real-time data aggregation
- Visualization rendering
- Multi-user statistics display

4 - Userdata.jsx

- Profile data management
- Form state handling
- Unsaved changes protection

5 - Counter.jsx

- Interactive count tracking
- Visual feedback system
- User-specific persistence

Recommended Improvements

1 - State Management

- Implement React Context for shared auth state
- Add session expiration handling
- Consider IndexedDB for larger datasets

2 - Security

- Implement JWT refresh mechanism
- Add CSRF protection
- Encrypt sensitive localStorage data

Steps to Run the project localy -

- Download code, unzip the file.
- Open code in any code editor like vscode.
- In the terminal write npm install
- Then npm run dev
