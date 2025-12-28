# Quick Setup Guide

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - You should see the vector graph page with mock data

## Current Status

**The app is already configured to use mock data by default!** No additional setup is needed to start testing. The hooks (`src/hooks/useVectorGraphData.ts`) are structured to look like they're connecting to an API, but they're using mock data internally.

The mock data includes 8 players with varied statistical profiles, so you can immediately see how the vectorization and 3D visualization work.

## Connecting to a Real API (Optional)

When you're ready to connect to a real backend:

1. **Configure your API endpoint:**
   - Create a `.env` file in the root directory
   - Add: `REACT_APP_API_BASE_URL=http://localhost:3001/api`
   - Adjust the URL to match your backend API

2. **Update the hooks:**
   - Open `src/hooks/useVectorGraphData.ts`
   - In each hook function, find the "MOCK DATA" comment
   - Replace the mock data assignment with the commented fetch code
   - Remove the mock data imports

## Troubleshooting

- **Type errors**: Make sure you've run `npm install` to get all TypeScript types
- **API errors**: Check that your API endpoints match the expected structure (see README.md)
- **No data showing**: Verify that your players have stats with games that have seasons
- **3D graph not rendering**: Check browser console for Three.js errors

## Next Steps

Once you have the app running:
1. Connect it to your actual API
2. Verify the data structure matches the expected format
3. Adjust the vector features if needed
4. Customize the visualization styles

