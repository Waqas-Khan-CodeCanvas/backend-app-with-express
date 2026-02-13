// config/cors.js

const allowedOrigins = process.env.NODE_ENV === "production"
  ? [
      "https://app.yourdomain.com",
      "https://admin.yourdomain.com"
    ]
  : [
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`🚫 Blocked by CORS: ${origin}`);
    return callback(new Error("Not allowed by CORS"));
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],

  exposedHeaders: [
    "Content-Length"
  ],

  credentials: true, // Only enable if using cookies

  optionsSuccessStatus: 204,

  maxAge: 86400 // 24 hours preflight cache
};

export {corsOptions};
