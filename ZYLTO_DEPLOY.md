# Replace the current Zylto site

This folder is the complete replacement project. It keeps the Zylto white, black, and lime-green design while adding the full six-platform ATS Screener application.

## What is already configured

- Zylto branding and theme
- Existing Firebase project: `zylto-resume-scan`
- Google sign-in and private scan history
- PDF and DOCX parsing in the browser
- Workday, Taleo, iCIMS, Greenhouse, Lever, and SuccessFactors scoring
- Gemini server route using `GEMINI_API_KEY`
- Existing Vercel production domain

The Firebase web configuration is public by design. The Gemini API key must remain private in Vercel.

## Before pushing

Keep your existing Vercel environment variable:

```text
GEMINI_API_KEY
```

If it has not been added yet, run:

```bash
cd ~/zylto
npx vercel env add GEMINI_API_KEY production
```

Never paste the Gemini key into GitHub or any source file.

## Replace Firestore rules

1. Open Firebase Console.
2. Select `zylto-resume-scan`.
3. Open Firestore Database → Rules.
4. Replace the editor with this project's `firestore.rules` file.
5. Click **Publish**.

These rules match the new scan-history format. Your old rules will block the replacement app from saving history.

## Deploy

After copying this complete folder into `~/zylto`, run:

```bash
cd ~/zylto
git add -A
git commit -m "Replace Zylto with full six-platform ATS screener"
git push
```

Vercel should detect SvelteKit and deploy automatically. Do not customize the build settings. The expected production build command is `pnpm build`.

## Test after deployment

1. Open https://zylto-ats-resume-checker.vercel.app
2. Sign in with Google.
3. Open **Scanner**.
4. Upload a PDF or DOCX resume.
5. Paste a job description.
6. Run the scan and confirm six platform scores appear.
7. Open **History** and confirm the scan was saved.

The original MIT `LICENSE` file and visible source attribution must remain in the project.
