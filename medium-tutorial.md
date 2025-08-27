# How to Fix the EAS "Slug Mismatch" Error Without Breaking Your React Native App

*A step-by-step guide to resolving the "Project config: Slug for project identified by 'extra.eas.projectId' does not match the 'slug' field" error while keeping your app submissions intact.*

---

Have you ever tried to change your React Native app's name only to be greeted by this frustrating error when building with EAS?

```
Project config: Slug for project identified by "extra.eas.projectId" (my-app) does not match the "slug" field (your-new-slug). Learn more: https://expo.fyi/eas-project-id
Error: build command failed.
```

If so, you're not alone! This is one of the most common issues developers face when rebranding their apps or simply wanting to change the app name after initial setup. In this tutorial, I'll walk you through exactly how I solved this problem while keeping my app submissions intact.

## The Problem: What Causes the Slug Mismatch?

When you first run `eas build`, Expo creates a project with your current `slug` value. This slug becomes permanently associated with your EAS project ID. If you later change the slug in `app.json`, EAS can't find the matching project, resulting in the mismatch error.

Think of it like this:
- **EAS Project ID**: Your app's permanent identity in Expo's system
- **Slug**: The "nickname" that should match the project
- **When they don't match**: EAS gets confused and refuses to build

## My Situation

I had a React Native quiz app originally named "my-app" but wanted users to see "PlanetFam Quiz" on their devices. After changing the slug to "planetfam-quiz", I hit the dreaded mismatch error.

## The Solution: Two Approaches

You have two main options when facing this error:

### Option 1: Revert the Slug (Recommended for Production Apps)
### Option 2: Create a New EAS Project (For Apps Not Yet Published)

Since my app was already submitted to the App Store, I chose Option 1 to avoid breaking existing submissions.

## Step-by-Step Fix (Option 1: Revert Slug)

### Step 1: Understanding the Key Files

The slug appears in several places that need to stay synchronized:

- `app.json` - Main app configuration
- `package.json` - Package name
- `ios/[app-name]/Info.plist` - iOS configuration

### Step 2: Smart Approach - Keep Display Name, Revert Technical Slug

Here's the clever part: you can keep your desired app name for users while reverting the technical slug for EAS compatibility.

**In `app.json`:**
```json
{
  "expo": {
    "name": "PlanetFam Quiz",        // ✅ Keep your desired name
    "slug": "my-app",                // ✅ Revert to original slug
    "ios": {
      "bundleIdentifier": "com.yourcompany.my-app"  // ✅ Match original
    }
  }
}
```

**In `package.json`:**
```json
{
  "name": "my-app"  // ✅ Revert to match slug
}
```

**In `ios/myapp/Info.plist`:**
```xml
<key>CFBundleDisplayName</key>
<string>PlanetFam Quiz</string>  <!-- ✅ Keep your desired display name -->

<key>CFBundleURLSchemes</key>
<array>
  <string>com.yourcompany.my-app</string>  <!-- ✅ Match bundle ID -->
  <string>exp+my-app</string>              <!-- ✅ Match slug -->
</array>
```

### Step 3: The Magic - Display Name vs Technical Slug

The brilliant part of this approach:
- **Technical slug stays "my-app"** (EAS happy ✅)
- **Users see "PlanetFam Quiz"** (Users happy ✅)
- **Existing submissions work** (App Store happy ✅)

### Step 4: Test Your Build

```bash
eas build --platform ios --profile production
```

If successful, you should see no more slug mismatch errors!

## When to Use Option 2 (New EAS Project)

Choose this if:
- Your app hasn't been submitted to app stores yet
- You're okay with losing build history
- You want the slug to match your new branding completely

**Steps for Option 2:**
1. Remove the `projectId` from `app.json`
2. Run `eas build` with your new slug
3. EAS will create a new project
4. Update your team with the new project ID

## Important Considerations

### App Store Submissions
After changing display names or configurations, you need:
```bash
eas submit --platform ios
```

**Not** `eas update` - because display name changes require App Store review.

### Node.js Version Requirements
If you encounter module loading errors, ensure you're using Node.js 18+:
```bash
# Check your version
node --version

# Update if needed (using nvm)
nvm install 18
nvm use 18
```

## Best Practices to Avoid This Issue

1. **Plan your app name early** - Choose your final name before first EAS build
2. **Use descriptive slugs** - Make them match your intended app name
3. **Separate display name from technical slug** - Remember they serve different purposes
4. **Test builds after any configuration changes** - Catch issues early

## Common Mistakes to Avoid

❌ **Don't change slug after production builds**
❌ **Don't forget to update all related files**
❌ **Don't use special characters in slugs**
❌ **Don't confuse `eas update` with `eas submit`**

✅ **Do plan your naming strategy early**
✅ **Do keep technical configs consistent**
✅ **Do test builds after changes**
✅ **Do understand the difference between display name and slug**

## Conclusion

The EAS slug mismatch error is frustrating but completely solvable. By understanding the relationship between your app's display name, technical slug, and EAS project ID, you can fix the issue while preserving your existing app store submissions.

The key insight is that users don't see the technical slug - they see the display name. So you can keep your EAS project happy with the original slug while giving users the app name you actually want.

Remember: for production apps, always choose the path that preserves your existing submissions and user base. A working app with a slightly imperfect technical slug is better than a broken build pipeline!

---

*Have you encountered this error before? What solution worked for you? Share your experience in the comments below!*

## Tags
#ReactNative #Expo #EAS #MobileDev #iOS #TechTutorial #AppDevelopment
