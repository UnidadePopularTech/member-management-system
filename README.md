This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Authentication Implementation Plan

### 1. Email/Password Registration
1. Create registration form components: ✅ (completed in commit 8f3d2a1)
   - Create `src/components/auth/RegisterForm.tsx` ✅
   - Implement form validation using Zod ✅
   - Add password strength requirements ✅
   - Add email validation ✅

2. Create registration API endpoint:
   - Create `src/app/api/auth/register/route.ts`
   - Implement password hashing with bcrypt
   - Add email uniqueness check
   - Create user in database

3. Add registration page:
   - Create `src/app/auth/register/page.tsx`
   - Implement error handling
   - Add success redirect

### 2. Email/Password Login
1. Create login form components:
   - Create `src/components/auth/LoginForm.tsx`
   - Implement form validation
   - Add "Remember me" functionality

2. Create login page:
   - Create `src/app/auth/signin/page.tsx`
   - Implement error handling
   - Add loading states

3. Enhance NextAuth configuration:
   - Update `src/lib/auth-options.ts`
   - Add proper error messages
   - Implement session handling

### 3. OAuth Providers
1. Set up Google OAuth:
   - Create Google OAuth credentials in Google Cloud Console
   - Add Google provider to NextAuth
   - Update environment variables

2. Set up GitHub OAuth:
   - Create GitHub OAuth app
   - Add GitHub provider to NextAuth
   - Update environment variables

3. Create OAuth buttons:
   - Create `src/components/auth/OAuthButtons.tsx`
   - Add loading states
   - Handle OAuth errors

### 4. Email Verification
1. Create email verification system:
   - Create `src/lib/email.ts` for email sending
   - Set up email templates
   - Add email service (e.g., Resend, SendGrid)

2. Create verification endpoints:
   - Create `src/app/api/auth/verify-email/route.ts`
   - Create `src/app/api/auth/resend-verification/route.ts`
   - Implement token generation and validation

3. Add verification UI:
   - Create `src/app/auth/verify-email/page.tsx`
   - Add resend verification button
   - Show verification status

### 5. Password Reset
1. Create password reset request:
   - Create `src/app/api/auth/forgot-password/route.ts`
   - Implement reset token generation
   - Set up email sending

2. Create password reset form:
   - Create `src/app/auth/reset-password/page.tsx`
   - Add token validation
   - Implement password update

3. Add security features:
   - Add rate limiting
   - Implement token expiration
   - Add password requirements

### 6. Additional Security Features
1. Implement rate limiting:
   - Add rate limiting middleware
   - Configure limits for different endpoints

2. Add session management:
   - Implement session timeout
   - Add "Sign out everywhere" feature
   - Add device tracking

3. Add security headers:
   - Configure CSP headers
   - Add HSTS
   - Implement CSRF protection

### Implementation Order:
1. Start with Email/Password Registration and Login (core functionality)
2. Add Email Verification (security)
3. Implement Password Reset (user experience)
4. Add OAuth Providers (additional login options)
5. Implement Additional Security Features (hardening)

## Getting Started with Authentication

1. First, ensure your database is running:
```bash
docker-compose up -d postgres
```

2. Run Prisma migrations:
```bash
npx prisma migrate dev
```

3. Set up your environment variables in `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_management?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-secret-key"
```

4. Start the development server:
```bash
npm run dev
```

5. Begin implementing the authentication features in the order specified above.

## User Management Features Implementation Plan

### 1. Profile Management
1. Create profile components:
   - Create `src/components/profile/ProfileForm.tsx`
   - Add avatar upload functionality
   - Implement profile data validation
   - Add profile picture cropping

2. Create profile API endpoints:
   - Create `src/app/api/profile/route.ts`
   - Implement profile update logic
   - Add avatar upload handling
   - Add profile data validation

3. Create profile page:
   - Create `src/app/profile/page.tsx`
   - Add profile data display
   - Implement edit mode
   - Add success/error notifications

### 2. Role-Based Access Control (RBAC)
1. Set up role system:
   - Update Prisma schema with role definitions
   - Create role middleware
   - Implement role validation utilities

2. Create role management:
   - Create `src/components/admin/RoleManager.tsx`
   - Add role assignment interface
   - Implement role validation
   - Add role-based UI components

3. Implement role protection:
   - Create role-based route protection
   - Add role-based component rendering
   - Implement role-based API access
   - Add role audit logging

### 3. User Settings
1. Create settings components:
   - Create `src/components/settings/SettingsForm.tsx`
   - Add notification preferences
   - Implement theme settings
   - Add language preferences

2. Create settings API:
   - Create `src/app/api/settings/route.ts`
   - Implement settings update logic
   - Add settings validation
   - Create settings cache system

3. Create settings page:
   - Create `src/app/settings/page.tsx`
   - Add settings categories
   - Implement real-time updates
   - Add settings persistence

## Admin Features Implementation Plan

### 1. User Listing
1. Create user list components:
   - Create `src/components/admin/UserList.tsx`
   - Add pagination
   - Implement sorting
   - Add filtering options

2. Create user list API:
   - Create `src/app/api/admin/users/route.ts`
   - Implement pagination logic
   - Add search functionality
   - Create user export feature

3. Create admin dashboard:
   - Create `src/app/admin/dashboard/page.tsx`
   - Add user statistics
   - Implement quick actions
   - Add activity overview

### 2. User Management
1. Create user management components:
   - Create `src/components/admin/UserManager.tsx`
   - Add user creation form
   - Implement user editing
   - Add user deletion

2. Create user management API:
   - Create `src/app/api/admin/users/[id]/route.ts`
   - Implement CRUD operations
   - Add bulk actions
   - Create user import feature

3. Add user management features:
   - Implement user status management
   - Add user activity tracking
   - Create user notes system
   - Add user tags

### 3. Activity Logs
1. Create activity logging system:
   - Create `src/lib/activity-logger.ts`
   - Implement log categories
   - Add log severity levels
   - Create log retention policy

2. Create activity log components:
   - Create `src/components/admin/ActivityLog.tsx`
   - Add log filtering
   - Implement log search
   - Create log export

3. Create activity log API:
   - Create `src/app/api/admin/activity-logs/route.ts`
   - Implement log retrieval
   - Add log filtering
   - Create log analytics

### Implementation Order:
1. Start with Profile Management (user experience)
2. Implement Role-Based Access Control (security)
3. Add User Settings (personalization)
4. Create User Listing (admin view)
5. Implement User Management (admin control)
6. Add Activity Logs (monitoring)

## Getting Started with User Management

1. Update your database schema:
```bash
npx prisma migrate dev --name add_user_management
```

2. Create necessary environment variables:
```env
# Add to your existing .env file
NEXT_PUBLIC_MAX_UPLOAD_SIZE=5242880 # 5MB
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png
```

3. Install additional dependencies:
```bash
npm install @uploadthing/react uploadthing sharp
```

4. Begin implementing the features in the order specified above.

## Security Considerations

1. Implement proper access control:
   - Validate user permissions
   - Sanitize user inputs
   - Rate limit API endpoints
   - Validate file uploads

2. Add data protection:
   - Encrypt sensitive data
   - Implement audit logging
   - Add data backup system
   - Create data retention policy

3. Monitor system health:
   - Add performance monitoring
   - Implement error tracking
   - Create health checks
   - Set up alerts
