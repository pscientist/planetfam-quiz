## Build a Horizontal, Top‑Aligned, Auto‑Expanding Flag List in React Native (Expo)

Creating a clean, responsive horizontal flag list in React Native is mostly about getting Flexbox right. In this tutorial, you’ll build a reusable `FlagCollection` component that:

- **lays out flags horizontally**
- **top‑aligns** each flag tile (so rows don’t look vertically centered)
- **auto‑expands** in non‑scrollable mode to fit all flags (and grows if more are added)

You can drop this into any Expo or React Native app.

### What you’ll build

- A `ScrollView`-based horizontal list for tight spaces.
- A non‑scrolling, wrapping “box” layout that grows with its content.
- Styles that keep the top edges of tiles aligned for a tidy grid.

---

## 1) Component skeleton

Start with a simple component that renders an array of country slugs as emoji + labels.

```tsx
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface FlagCollectionProps {
  collectedCountries: string[];
  title?: string;
  scrollable?: boolean; // if false, we render a wrapping, expanding grid
}

export default function FlagCollection({
  collectedCountries,
  title = 'Flags Collected',
  scrollable = true,
}: FlagCollectionProps) {
  const getFlagEmoji = (slug: string) => {
    const flagMap: { [key: string]: string } = {
      spain: '🇪🇸', thai: '🇹🇭', russia: '🇷🇺', ethiopia: '🇪🇹', nz: '🇳🇿',
      philipines: '🇵🇭', png: '🇵🇬', sweden: '🇸🇪', germany: '🇩🇪',
      netherlands: '🇳🇱', uk: '🇬🇧', srilanka: '🇱🇰', switzerland: '🇨🇭',
      finland: '🇫🇮', hk: '🇭🇰', saudi: '🇸🇦',
    };
    return flagMap[slug] || '🏳️';
  };

  const getCountryName = (slug: string) => {
    const countryNames: { [key: string]: string } = {
      spain: 'Spain', thai: 'Thailand', russia: 'Russia', ethiopia: 'Ethiopia', nz: 'New Zealand',
      philipines: 'Philippines', png: 'Papua New Guinea', sweden: 'Sweden', germany: 'Germany',
      netherlands: 'Netherlands', uk: 'United Kingdom', srilanka: 'Sri Lanka', switzerland: 'Switzerland',
      finland: 'Finland', hk: 'Hong Kong', saudi: 'Saudi Arabia',
    };
    return countryNames[slug] || slug;
  };

  const flagItems = collectedCountries.map((slug, index) => (
    <View key={index} style={styles.flagItem}>
      <Text style={styles.flagEmoji}>{getFlagEmoji(slug)}</Text>
      <Text style={styles.countryName}>{getCountryName(slug)}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      {scrollable ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flagsContainer}
          contentContainerStyle={styles.flagsContent}
        >
          {flagItems}
        </ScrollView>
      ) : (
        <View style={[styles.flagsContainer, styles.boxContainer]}>
          <View style={[styles.flagsContent, styles.boxContent]}>
            {flagItems}
          </View>
        </View>
      )}
    </View>
  );
}
```

---

## 2) Horizontal layout that top‑aligns tiles

The keys:

- **Horizontal flow** via `contentContainerStyle: { flexDirection: 'row' }`.
- **Top alignment** via `alignItems: 'flex-start'` so the emoji + label are aligned to the top, not middle.

```tsx
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    marginTop: -20,
    minHeight: 120, // lets the section grow if needed
  },
  flagsContainer: {
    flex: 0, // size to content in both modes
    marginTop: 15,
  },
  flagsContent: {
    flexDirection: 'row',
    alignItems: 'flex-start', // top-align each flag item
    paddingHorizontal: 4,
  },
  flagItem: {
    alignItems: 'center',
    width: 60,
  },
  flagEmoji: {
    fontSize: 50,
    textAlign: 'center',
  },
  countryName: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 13,
  },
});
```

This makes the scrollable variant render in a single row, with tiles pinned to the top edge.

---

## 3) A non‑scrolling grid that auto‑expands

When `scrollable` is `false`, we want a wrapping grid that grows as more flags are added. The combination to remember:

- parent container uses `flex: 0` (so it sizes to content)
- inner content uses `flexWrap: 'wrap'` to create multiple rows
- keep rows tidy with `justifyContent: 'center'` and top alignment via `alignItems: 'flex-start'`

```tsx
const styles = StyleSheet.create({
  // ...
  boxContainer: {
    flex: 0,      // do not force-fill available height
    marginTop: 15,
  },
  boxContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start', // top-align tiles within each row
    paddingHorizontal: 4,
  },
});
```

Optional: if you want wrapped rows to pack to the top (when the grid is taller than needed), also add:

```tsx
alignContent: 'flex-start'
```

to `boxContent`.

---

## 4) Using the component

```tsx
// Example usage in a screen/component
<FlagCollection
  collectedCountries={['spain', 'germany', 'sweden', 'nz', 'ethiopia']}
  scrollable={false} // switch to true for horizontal scrolling
/>
```

Tip: For very long lists, consider `FlatList` with `horizontal` for better performance. For mixed emoji + labels and modest list sizes, `ScrollView` is fine.

---

## 5) Troubleshooting checklist

- **Items are vertically centered**: Ensure `alignItems: 'flex-start'` is on the same style object as the row container (`flagsContent` or `boxContent`).
- **Grid doesn’t grow**: Use `minHeight` on the outer container and set `flex: 0` on the non‑scrolling containers.
- **Rows not packing to the top**: Add `alignContent: 'flex-start'` to the wrapping container.
- **Tiles too wide/narrow**: Adjust `flagItem.width` and `flagEmoji.fontSize` as needed.

---

## Final styles (copy/paste)

```tsx
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    marginTop: -20,
    minHeight: 120,
  },
  flagsContainer: {
    flex: 0,
    marginTop: 15,
  },
  flagsContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  boxContainer: {
    flex: 0,
    marginTop: 15,
  },
  boxContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // Optional for packing rows to top:
    // alignContent: 'flex-start',
    paddingHorizontal: 4,
  },
  flagItem: {
    alignItems: 'center',
    width: 60,
  },
  flagEmoji: {
    fontSize: 50,
    textAlign: 'center',
  },
  countryName: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 13,
  },
});
```

---

## Wrap‑up

By combining a horizontal `ScrollView`, correct Flexbox alignment, and a wrapping grid that sizes to content, you get a flexible `FlagCollection` that looks good in both compact and spacious layouts—and grows automatically as users collect more flags.

If you found this helpful, consider bookmarking for your next RN layout task. Happy building!


