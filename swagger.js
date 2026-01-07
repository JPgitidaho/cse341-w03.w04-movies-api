export default {
  openapi: '3.0.0',
  info: {
    title: 'Movies API',
    version: '1.0.0',
    description: 'API for managing directors and movies with authentication'
  },
  servers: [
    
    { url: 'https://cse341-w03-w04-movies-api.onrender.com', description: 'Render server' }
  ],
  components: {
    securitySchemes: {
      sessionAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid'
      }
    },
    schemas: {
      Director: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          birthYear: { type: 'integer' }
        },
        required: ['name']
      },
      Movie: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          year: { type: 'integer' },
          director: { type: 'string' }
        },
        required: ['title', 'year', 'director']
      },
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          email: { type: 'string' },
          provider: { type: 'string' },
          displayName: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/auth/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Create account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'newuser@example.com' },
                  password: { type: 'string', example: 'StrongPass123!' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          201: { description: 'User registered and logged in' },
          400: { description: 'Invalid input' }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login with email and password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'testuser@example.com' },
                  password: { type: 'string', example: 'StrongPass123!' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Login failed' }
        }
      }
    },
    '/auth/logout': {
      get: {
        tags: ['Auth'],
        summary: 'Logout current user',
        responses: {
          200: { description: 'Logged out successfully' }
        }
      }
    },
    '/auth/google': {
      get: {
        tags: ['Auth'],
        summary: 'Login with Google',
        responses: {
          302: { description: 'Redirect to Google OAuth' }
        }
      }
    },
    '/auth/google/callback': {
      get: {
        tags: ['Auth'],
        summary: 'Google OAuth callback',
        responses: {
          200: { description: 'Google login successful' },
          401: { description: 'Google login failed' }
        }
      }
    },
    '/api/directors': {
      get: {
        tags: ['Directors'],
        summary: 'Get all directors',
        responses: { 200: { description: 'List of directors' } }
      },
      post: {
        tags: ['Directors'],
        summary: 'Create a new director',
        security: [{ sessionAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Director' }
            }
          }
        },
        responses: {
          201: { description: 'Director created' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/api/directors/{id}': {
      get: {
        tags: ['Directors'],
        summary: 'Get director by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Director found' },
          404: { description: 'Not found' }
        }
      },
      put: {
        tags: ['Directors'],
        summary: 'Update director by ID',
        security: [{ sessionAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Director' }
            }
          }
        },
        responses: {
          200: { description: 'Director updated' },
          401: { description: 'Unauthorized' },
          404: { description: 'Not found' }
        }
      },
      delete: {
        tags: ['Directors'],
        summary: 'Delete director by ID',
        security: [{ sessionAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Director deleted' },
          401: { description: 'Unauthorized' },
          404: { description: 'Not found' }
        }
      }
    },
    '/api/movies': {
      get: {
        tags: ['Movies'],
        summary: 'Get all movies',
        responses: { 200: { description: 'List of movies' } }
      },
      post: {
        tags: ['Movies'],
        summary: 'Create a new movie',
        security: [{ sessionAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Movie' }
            }
          }
        },
        responses: {
          201: { description: 'Movie created' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/api/movies/{id}': {
      get: {
        tags: ['Movies'],
        summary: 'Get movie by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Movie found' },
          404: { description: 'Not found' }
        }
      },
      put: {
        tags: ['Movies'],
        summary: 'Update movie by ID',
        security: [{ sessionAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Movie' }
            }
          }
        },
        responses: {
          200: { description: 'Movie updated' },
          401: { description: 'Unauthorized' },
          404: { description: 'Not found' }
        }
      },
      delete: {
        tags: ['Movies'],
        summary: 'Delete movie by ID',
        security: [{ sessionAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Movie deleted' },
          401: { description: 'Unauthorized' },
          404: { description: 'Not found' }
        }
      }
    }
  }
}
