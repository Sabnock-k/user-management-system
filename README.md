# User Management System

##  Introduction
A full-stack application for managing user accounts with features like email sign-up, verification, authentication, role-based authorization, and CRUD operations.

## Installation
Follow these steps to set up project locally.

### 1. Clone the repository. 

```
git clone https://github.com/Sabnock-k/user-management-system.git
```

### 2. Install dependencies:

```
npm install
npm run install:backend
npm run install:frontend
```

### 3. Start the backend server:

```
npm start
```

### 4. Start the Angular app:

```
ng serve
```

## Usage
* Register a new account at */accounts/register*.
* Verify your email using the link sent to your inbox.
* Log in at */accounts/login*.

## Testing
### **Functional testing results:** [https://docs.google.com/document/d/1zkrHnNJTvbq-L289UgOpzY6RdiAnttoRgajw37rYZjw/edit?tab=t.0]

---
### **Security Testing Documentation**
#### 1. XSS (Cross-Site Scripting)
- **Status:** ❌ Vulnerable
- **Location:** `fake-backend.ts`
- **Risk Level:** High
- **Details:** Unsanitized HTML content rendering in alert messages
```typescript
alertService.info(`
    <h4>Email Already Registered</h4>
    <p>Your email <strong>${account.email}</strong> is already registered.</p>
`);
```
- **Recommendation:** Implement Angular's DomSanitizer
```typescript
// filepath: src/app/services/alert.service.ts
import { DomSanitizer, SecurityContext } from '@angular/platform-browser';

export class AlertService {
  constructor(private sanitizer: DomSanitizer) {}

  info(content: string): void {
    const sanitizedContent = this.sanitizer.sanitize(SecurityContext.HTML, content);
    // Display sanitized content
  }
}
```
- DomSanitizer strips potentially dangerous HTML/JavaScript
- Prevents execution of malicious scripts while preserving legitimate formatting

---
#### 2. CSRF Protection
- **Status:** ❌ Missing
- **Risk Level:** Critical
- **Impact:** Vulnerable to cross-site request forgery attacks
- **Recommendation:** Implement CSRF tokens using csurf middleware
```javascript
// filepath: src/server.js
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
```
**Angular Integration**
```javascript
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
  })
};
```
- Generates unique CSRF token per session
- Prevents cross-site request forgery attacks
- Attacker's site cannot access/replicate token

---
#### 3. Security Headers
- **Status:** ❌ Missing
- **Risk Level:** High
- **Details:** Basic security headers not configured
- **Recommendation:** Implement Helmet middleware
```javascript
// filepath: src/server.js
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  frameguard: { action: 'deny' },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true
  }
}));
```
- Sets critical security headers
- Prevents various attack vectors including XSS and clickjacking
- Forces HTTPS connections
- Controls resource loading sources

---
#### 4. Input Validation
- **Status:** ⚠️ Partial Implementation
- **Risk Level:** Medium
- **Location:** `src/controllers/user.controller.ts`
- **Details:** Incomplete validation on user input
- **Recommendation:** Strengthen validation rules
```typescript
// filepath: src/validators/user.validator.ts
import * as Joi from 'joi';

export const userValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .trim()
    .lowercase(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});
```
- Validates all input before processing
- Enforces strict data format rules
- Prevents injection attacks
- Provides clear error messages

---
#### 5. Rate Limiting
- **Status:** ❌ Missing
- **Risk Level:** High
- **Impact:** Vulnerable to brute force attacks
- **Recommendation:** Implement rate limiting for API endpoints
```javascript
// filepath: src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again after 15 minutes'
});

app.use('/api/auth/login', loginLimiter);
```
- Tracks requests by IP address
- Blocks excessive attempts
- Prevents brute force attacks
- Different limits for different endpoints

---
#### 6. Password Policy
- **Status:** ⚠️ Weak
- **Location:** `src/services/auth.service.js`
- **Details:** Minimal password requirements
- **Recommendation:** Enhance password complexity rules
```javascript
// filepath: src/services/auth.service.js
const passwordSchema = Joi.string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  .required()
  .messages({
    'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character'
  });
```
- Enforces strong password requirements
- Requires mixed case, numbers, and special characters
- Minimum length of 8 characters
- Provides clear error messages

# frends

Rafael B. Patiño
- 8th dwarf ni snow white / Lead Programmer / Project Coordinator / Project Manager / Backend / AKA tig mandar

John Ray Tinga
- airport forehead / Lion sin of pride / Frontend / AKA Vegeta ass hairline kapatid ni Ms Database

Damien Cumeran
- Rizzler / Molester / Programmer / Backend / AKA Utak ng himagsikan

James Stanley Dimarucut
- Brain rot / Programmer / Frontend / AKA Nag himagsikan ang utak
