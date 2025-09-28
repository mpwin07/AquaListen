# AquaListen Dashboard Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from **Linear** and **Notion** for their clean, functional interfaces with subtle visual sophistication that matches this scientific/conservation application.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light mode: 203 85% 25% (deep ocean blue)
- Dark mode: 203 80% 15% (darker ocean depth)

**Secondary/Accent:**
- Teal accent: 180 70% 45% (healthy reef indicator)
- Warning: 35 85% 55% (amber for caution)
- Critical: 0 75% 55% (coral red for stressed reefs)

**Background Treatments:**
- Subtle ocean-inspired gradients from deep blue to teal in hero sections
- Gentle wave-like patterns as background textures
- Soft gradient overlays on data visualization areas

### B. Typography
- **Primary:** Inter (Google Fonts) for UI elements and body text
- **Data/Code:** JetBrains Mono for API responses and technical data
- Hierarchy: 32px/24px/18px/16px/14px sizes with 400/500/600 weights

### C. Layout System
**Tailwind spacing units:** 2, 4, 6, 8, 12, 16
- Consistent padding: p-4, p-6, p-8
- Margins: m-2, m-4, m-8
- Gap spacing: gap-4, gap-6, gap-8

### D. Component Library

**Navigation:**
- Top nav with frosted glass effect and subtle shadow
- Collapsible sidebar with smooth transitions
- Breadcrumb navigation for deep pages

**Data Display:**
- Cards with subtle borders and soft shadows
- Health status badges with rounded corners and appropriate colors
- Confidence meters as animated progress bars
- Spectrogram viewers with dark themes and neon accent lines

**Forms & Interactions:**
- Drag-and-drop zones with dashed borders and hover states
- File upload progress bars with smooth animations
- Modal overlays with backdrop blur

**Maps & Visualizations:**
- Dark-themed maps with ocean-blue markers
- Chart components using ocean-inspired color palettes
- Data tables with zebra striping and hover highlights

### E. Visual Treatments

**Conservation-Focused Aesthetics:**
- Ocean depth gradients (deep blue to teal)
- Subtle wave patterns in background elements
- Reef-inspired accent colors (coral, sea foam, deep blue)
- Scientific precision with warm, approachable touches

**Status Indicators:**
- Healthy: Soft teal/green tones
- Stressed: Warm coral/orange alerts
- Critical: Bold red warnings
- Processing: Animated blue pulses

**Micro-Interactions:**
- Gentle hover states on interactive elements
- Smooth loading animations for audio processing
- Subtle scale transforms on buttons and cards
- Progress indicators with ocean wave motion

## Page-Specific Design Notes

**Dashboard:** Clean grid layout with status overview cards, trending charts with ocean color schemes, and a prominent upload call-to-action.

**Upload Pages:** Generous whitespace around drag-drop zones, file preview cards with soft shadows, and clear progress visualization.

**Sites Map:** Dark map theme with bright reef markers, elegant popup panels, and filtering controls in a sidebar.

**Model Info:** Technical data presented in clean, readable cards with appropriate monospace fonts for code/data sections.

The overall aesthetic should feel like a sophisticated scientific instrument with the approachability of modern productivity tools, reflecting both the serious conservation mission and the need for researchers to efficiently analyze reef health data.