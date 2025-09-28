# Airtable Setup for Form Submissions

## 1. Create Airtable Base

1. Go to [Airtable.com](https://airtable.com) and create a new base
2. Name it "Form Submissions" or similar
3. Create a table called "Form Submissions"

## 2. Set Up Table Fields

Create these fields in your "Form Submissions" table:

| Field Name   | Field Type       | Description                             |
| ------------ | ---------------- | --------------------------------------- |
| Form Name    | Single line text | Name of the form (e.g., "Contact Form") |
| Email        | Email            | Submitter's email address               |
| Submitted At | Date             | When the form was submitted             |
| Form Data    | Long text        | JSON string of all form data            |

## 3. Get API Credentials

1. Go to [Airtable Account](https://airtable.com/account)
2. Click "Generate API key"
3. Copy your API key
4. Get your Base ID from the base URL: `https://airtable.com/appXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX/viwXXXXXXXXXXXXXX`
   - The Base ID is the part after `/app` and before `/tbl`

## 4. Environment Variables

Add these to your `.env.local` file:

```bash
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
```

## 5. Benefits of Airtable Approach

- ✅ **Simple Setup**: No complex blob management
- ✅ **Web Interface**: View submissions in Airtable's interface
- ✅ **Reliable**: Airtable is very stable
- ✅ **Searchable**: Built-in search and filtering
- ✅ **Exportable**: Easy to export data
- ✅ **Collaborative**: Share access with team members
- ✅ **No Email Issues**: No deliverability problems

## 6. Viewing Submissions

You can view form submissions in two ways:

1. **Airtable Web Interface**: Log into Airtable to see all submissions
2. **Custom Admin Interface**: The existing `/forms/admin` route (needs updating to read from Airtable)

## 7. Next Steps

- Remove Vercel Blob dependency: `pnpm remove @vercel/blob`
- Update admin interface to read from Airtable instead of Vercel Blob
- Test form submissions to ensure they appear in Airtable
