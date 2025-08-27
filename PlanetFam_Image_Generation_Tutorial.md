# PlanetFam: Image Generation with OpenAI (Step‑by‑Step Tutorial)

This guide focuses only on **generating images** with OpenAI for your
PlanetFam quiz app. We'll build a **Node.js CLI** that: - Takes a
country (+ dishes/landmarks) as input\
- Calls OpenAI's image API (defaults to **`dall-e-3`**)\
- Outputs a **9:16** vertical **WebP** (\~100 KB)\
- Updates a small `manifest.json` for your app to read

> Why `dall-e-3`? It's high‑quality and doesn't require org
> verification. You can switch to `gpt-image-1` later (requires
> verification) by passing a flag/env var.

------------------------------------------------------------------------

## 1) Project setup

``` bash
mkdir planetfam-scripts && cd planetfam-scripts
npm init -y
npm install openai sharp fs-extra yargs
```

Set your API key (macOS/Linux):

``` bash
export OPENAI_API_KEY=sk-...yourkey...
```

Windows (Powershell):

``` powershell
$env:OPENAI_API_KEY="sk-...yourkey..."
```

------------------------------------------------------------------------

## 2) The CLI: `generate-images.js` (CommonJS)

> Save this as `generate-images.js` in the project root. It supports
> **single country** (`--country`) and **batch**
> (`--batch ./countries.json`). It also supports `--model gpt-image-1`
> later, plus quality/size options.

``` js
... (code omitted for brevity in this snippet) ...
```

------------------------------------------------------------------------

## 3) Batch file (optional)

Create `countries.json` (for batch runs):

``` json
[
  {
    "name": "Japan",
    "dishes": ["sushi", "ramen", "mochi"],
    "landmarks": ["Mount Fuji", "Tokyo Tower"]
  },
  {
    "name": "Italy",
    "dishes": ["pizza", "pasta", "gelato"],
    "landmarks": ["Colosseum", "Leaning Tower of Pisa"]
  }
]
```

------------------------------------------------------------------------

## 4) Usage

**Single country:**

``` bash
OPENAI_API_KEY=$OPENAI_API_KEY node generate-images.js   --country "Japan"   --dishes "sushi,ramen,mochi"   --landmarks "Mount Fuji,Tokyo Tower"
```

**Batch:**

``` bash
OPENAI_API_KEY=$OPENAI_API_KEY node generate-images.js --batch ./countries.json
```

**Switch model later (after org verification):**

``` bash
MODEL=gpt-image-1 OPENAI_API_KEY=$OPENAI_API_KEY node generate-images.js --batch ./countries.json
# or
OPENAI_API_KEY=$OPENAI_API_KEY node generate-images.js --model gpt-image-1 --country "Italy" --dishes "pizza,pasta,gelato" --landmarks "Colosseum,Leaning Tower of Pisa"
```

------------------------------------------------------------------------

## 5) How the script works (explained)

-   **Arguments (`yargs`)**\
    Accepts `--country`, `--dishes`, `--landmarks` for quick one‑offs,
    or `--batch` pointing to a JSON array for bulk generation. You can
    also tweak `--quality` and the final `--width/--height` if you want
    smaller/larger files.

-   **Prompt construction (`buildPrompt`)**\
    Keeps your **PlanetFam Style** consistent by concatenating:\
    `Cartoon family dining in [country] + dishes + landmarks + style line`.\
    Consistency in wording yields more stable outputs for kids' UI.

-   **Image generation (`openai.images.generate`)**

    -   Uses `model: "dall-e-3"` by default (no org verification
        needed).\
    -   Requests base64 output with `response_format: "b64_json"` to
        avoid the "undefined Buffer" issue.\
    -   Uses `size: "1024x1792"` (vertical) to better suit 9:16
        compositions.

-   **Post‑processing (`sharp`)**

    -   Resizes to **1080×1920** (true 9:16) with `fit: "cover"` to
        maintain composition.\
    -   Converts to **WebP** with adjustable `quality` (start at 70;
        lower to get closer to \~100 KB).

-   **Manifest**

    -   Appends
        `{ country: { image, dishes, landmarks, bytes, model } }` to
        `manifest.json`, so your app has a single source of truth.

-   **Retries**

    -   `withRetry` gives you a few attempts if the API gets moody (rate
        limits, transient errors).

------------------------------------------------------------------------

## 6) Common errors & how to fix them

-   **`Cannot use import statement outside a module`**\
    Use the **CommonJS** version above, or add `"type": "module"` to
    `package.json`.

-   **`Missing OPENAI_API_KEY`**\
    Set the env var before running. Confirm in the same shell session:

    ``` bash
    echo $OPENAI_API_KEY
    ```

-   **`res.data[0].b64_json` is undefined**\
    Make sure you include `response_format: "b64_json"`.\
    (If you omit it, the API may return a URL instead of base64.)

-   **"Unknown parameter: 'image'"** with `images.generate`\
    `images.generate` only takes **text prompts**. You can't attach a
    reference image here.\
    (OpenAI's **edits/variations** require `dall-e-2`, which isn't ideal
    for your use case.)

-   **Org verification errors**\
    If you switch to `gpt-image-1` and see "must be verified," use
    `dall-e-3` for now, or verify your org in OpenAI settings.

------------------------------------------------------------------------

## 7) Optional: add NPM scripts

In `package.json`:

``` json
{
  "scripts": {
    "gen:one": "node generate-images.js --country Japan --dishes sushi,ramen,mochi --landmarks "Mount Fuji,Tokyo Tower"",
    "gen:batch": "node generate-images.js --batch ./countries.json"
  }
}
```

------------------------------------------------------------------------

## 8) Style tuning tips (for all-ages, bold & inclusive)

-   Keep a **stable style line** (like `DEFAULT_STYLE`) across runs.\
-   Minimal text inside the scene; rely on clear icons/labels and bright
    color blocks.\
-   9:16 vertical; make characters and dishes **large** and **readable**
    for kids.\
-   If results drift, **tighten the wording** ("thin borders", "light
    shadows", "bold shapes", "large text labels").

------------------------------------------------------------------------

That's it! You now have a focused, repeatable image generation pipeline
using OpenAI, ready to feed your PlanetFam quiz screens. When you're
ready, we can add **LQIP thumbnails** or move on to **CDN +
caching**---but this gets the images in your hands fast.
