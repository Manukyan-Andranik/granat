# QA Codebase Review — Light Mode & UI/UX Audit

This report documents bugs, contrast errors, and UI/UX mismatches related to the Light Mode implementation across the project codebase.

---

## 1. Light Mode Visual & Contrast Bugs

### 🕵️‍♂️ Invisible Mobile Hamburger Menu
- **File**: [Navbar.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/Navbar.jsx#L301-L311)
- **Code**: `className="block w-5 h-[2px] bg-white"` (for all three span lines)
- **Impact**: **High Severity**. In light mode, the header has a white or transparent background. Because the hamburger bars are hardcoded to `bg-white`, they blend completely with the background, rendering the hamburger menu button invisible.
- **Recommended Fix**: Use theme-aware classes like `bg-white dark:bg-black` or let `index.css` override the hamburger bar color in light mode.

### 🕵️‍♂️ Invisible Footer Copyright Text
- **File**: [Footer.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/Footer.jsx#L81)
- **Code**: `text-white/15`
- **Impact**: **Medium Severity**. The copyright text is set to `text-white/15`. There is no override for `.text-white/15` in `index.css`, leaving it as `rgba(255, 255, 255, 0.15)`. This makes the copyright line completely invisible on a light gray page.
- **Recommended Fix**: Add `.text-white/15` override in `index.css` for `html.light` or use a standard text-color utility class.

### 🕵️‍♂️ Disappearing Link Text on Hover
- **File**: [Footer.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/Footer.jsx#L53)
- **Code**: `whileHover={{ x: 5, color: '#FFFFFF' }}` (applied on multiple menu links)
- **Impact**: **Medium Severity**. Hovering over the links in the footer animates their color directly to solid white (`#FFFFFF`). On a light page, this makes the link text disappear upon hover, confusing users.
- **Recommended Fix**: Use dynamic color properties or skip hardcoded hex colors in Framer Motion animations.

### 🕵️‍♂️ Unmapped Background Opacities (`bg-white/3` and `bg-white/[0.05]`)
- **Files**: [BusinessProducts.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/BusinessProducts.jsx#L74), [ProcessTimeline.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/ProcessTimeline.jsx#L33)
- **Impact**: **Low-Medium Severity**. These files use `bg-white/3` and `bg-white/8` or `hover:bg-white/[0.05]`. Because these custom tailwind opacity values are not mapped in `index.css`'s light mode overrides, they render as translucent white on light containers. This makes the product cards and process steps look completely flat and merged with the background.
- **Recommended Fix**: Add overrides for `.bg-white/3` and hover states in `index.css` or use theme-aware border outlines.

### 🕵️‍♂️ Invisible Metric Boxes
- **File**: [Hero.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/Hero.jsx#L184)
- **Code**: `bg-white/[0.01]`
- **Impact**: **Low Severity**. The statistics/metrics cards in the Hero section have `bg-white/[0.01]` which remains invisible in light mode, losing the box outline separation.
- **Recommended Fix**: Standardize to `.bg-white/5` or map `.bg-white/\[0\.01\]` to a light background color.

### 🕵️‍♂️ Low Contrast Terminal Text in Hero
- **File**: [Hero.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/Hero.jsx#L110-L113)
- **Code**: `text-green-400`, `text-cyan-300`
- **Impact**: **Medium Severity (Accessibility Fail)**. Bright green and cyan text on a light gray card fails WCAG AA color contrast guidelines, making terminal commands unreadable.
- **Recommended Fix**: Override terminal text color values inside `index.css` for light mode to show darker green/blue shades.

---

## 2. UI/UX & Usability Inconsistencies

### 🕵️‍♂️ Dark Inline Backgrounds on Inactive Service Cards
- **File**: [ServiceCards.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/ServiceCards.jsx#L210-L212)
- **Code**:
  ```javascript
  const cardBg = isActive 
    ? 'rgba(215,38,56,0.09)' 
    : (isMobile ? 'rgba(18,18,20,0.92)' : 'rgba(18,18,20,0.75)');
  ```
- **Impact**: **High Severity**. The inactive background colors are inline-styled as dark charcoal (`rgba(18,18,20,0.75)`). Since inline styles take precedence over CSS, they remain dark gray in light mode. Meanwhile, `index.css` forces `text-white` inside headers to `#1D1D1F` (dark gray), which makes all text inside the cards completely unreadable (dark text on dark background).
- **Recommended Fix**: Move background color classes to Tailwind styles or use a theme-aware state function in JS to select `rgba` values.

### 🕵️‍♂️ Modal Tagline Contrast Violation
- **File**: [HomePage.jsx](file:///Users/andranikmanukyan/Desktop/granat%20pages/granat-it/src/components/HomePage.jsx#L786)
- **Code**: `style={{ color: activeModal.accent }}`
- **Impact**: **Medium Severity (Accessibility Fail)**. The service detail modal renders the tagline with the service's custom accent color. For services using lighter accents like Amber (`#F59E0B`), the text has extremely poor contrast on a white modal background.
- **Recommended Fix**: Enforce a darker fallback shade or adjust styling to keep contrast ratio above 4.5:1.
