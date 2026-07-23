# ecobill_web
This is the frontend for ECOBILL solution

## API configuration

EcoBill uses `VITE_API_BASE_URL` for the backend API origin.

Local development is configured in `.env.development`:

```env
VITE_API_BASE_URL=http://localhost:5049
```

For deployment, set the environment variable in the hosting platform before
building:

```env
VITE_API_BASE_URL=https://api.your-domain.com
```

If the deployed frontend and API share the same origin, the variable can be
left empty. Restart the development server after changing an environment file.
