# Google Apps Script Deployment Checklist

## ⚠️ IMPORTANT: You must redeploy your script!

The deployed script doesn't have the `doPost` function. Follow these steps:

## Step 1: Open Google Apps Script
1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**

## Step 2: Replace the code
1. **DELETE ALL existing code** in the editor
2. Copy **EVERYTHING** from `WORKING-APPS-SCRIPT.gs`
3. Paste it into the Apps Script editor
4. Click **Save** (Ctrl+S or Cmd+S)

## Step 3: Deploy as Web App
1. Click **Deploy** → **Manage deployments**
2. Click **New deployment** (or edit existing if you see "AKfycbySOLOIy2CVyWk89R4m5hA5gefWOJs22r5xB9enBZQp9lGNiBZqay0_vZTCEDrAWMyn")
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **Web app**
5. Set:
   - **Description**: "Form submission handler v2"
   - **Execute as**: **Me (your-email@gmail.com)**
   - **Who has access**: **Anyone**
6. Click **Deploy**

## Step 4: Copy the NEW Web App URL
1. After deployment, you'll see a new URL
2. Copy the URL (it should end with `/exec`)
3. Update your `.env` file with this new URL

## Step 5: Update .env file
```bash
VITE_APPS_SCRIPT_URL=<paste the NEW URL here>
VITE_API_KEY=vrtw0cvrv3673cg45234787heijGDEWYne9143jfnshjeu66dgfytfitxws
VITE_SHEETS_TAB_APPLY=Apply
VITE_SHEETS_TAB_INNOVATION=Innovation
```

## Step 6: Restart dev server
1. Stop the current dev server (Ctrl+C)
2. Run `npm run dev` again

## Step 7: Test!
1. Open http://localhost:8082
2. Try submitting a form
3. Check your Google Sheet for new data

## Troubleshooting

### Error: "doPost is not defined"
- You didn't replace the code properly
- Go back to Step 2

### Error: "Invalid request - no event data"
- The URL is still pointing to the old deployment
- Redeploy and use the NEW URL

### Form submits but no data appears
- Check Apps Script logs: **View** → **Logs** in the editor
- Look for error messages

### Still not working?
- Make sure you clicked **Save** after pasting the code
- Make sure you created a **NEW deployment** (don't just edit)
- Verify the URL in `.env` matches the deployment URL

