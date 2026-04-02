# Product Description HTML Guide

This guide shows you all the HTML elements you can use in the `longDescription` field of products.json

## Basic Text Elements

### Paragraphs
```html
<p>This is a regular paragraph with body text.</p>
```

### Headings
```html
<h2>Main Section Title</h2>
<h3>Subsection Title</h3>
<h4>Smaller Subsection</h4>
```

### Text Formatting
```html
<strong>Bold text for emphasis</strong>
<em>Italic text</em>
```

## Lists

### Unordered List (Bullets)
```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### Ordered List (Numbers)
```html
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
```

### List with Bold Labels
```html
<ul>
  <li><strong>Feature Name:</strong> Description of the feature</li>
  <li><strong>Another Feature:</strong> More details here</li>
</ul>
```

## Media

### Images
```html
<img src="assets/images/product-screenshot.png" alt="Product screenshot">
```

### Videos (Local)
```html
<video controls>
  <source src="assets/videos/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

### YouTube Embed
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

### Vimeo Embed
```html
<iframe src="https://player.vimeo.com/video/VIDEO_ID" width="640" height="360" frameborder="0" allowfullscreen></iframe>
```

## Quotes

### Blockquote
```html
<blockquote>
  "This automation saved us 20 hours per week!" - Happy Customer
</blockquote>
```

## Code Examples (if needed)

### Inline Code
```html
<p>Use the <code>automation.start()</code> method to begin.</p>
```

### Code Block
```html
<pre><code>function example() {
  return "Hello World";
}</code></pre>
```

## Complete Example

Here's a full example combining multiple elements:

```json
{
  "title": "AI Voice Agent",
  "shortDescription": "AI-powered phone agent that handles calls 24/7",
  "longDescription": "<p>Our AI Voice Agent revolutionizes your phone operations by handling inbound and outbound calls with human-like conversation quality.</p><h2>Key Features</h2><ul><li><strong>24/7 Availability:</strong> Never miss a call, even outside business hours</li><li><strong>Natural Conversations:</strong> Human-like dialogue that customers trust</li><li><strong>CRM Integration:</strong> Automatically updates your customer database in real-time</li><li><strong>Multi-language Support:</strong> Communicate with customers in their preferred language</li></ul><h2>How It Works</h2><ol><li>Customer calls your number</li><li>AI agent answers and engages in natural conversation</li><li>Information is logged in your CRM automatically</li><li>Follow-up actions are scheduled</li></ol><img src=\"assets/images/ai-voice-demo.png\" alt=\"AI Voice Agent Dashboard\"><h2>Perfect For</h2><ul><li>Appointment scheduling and reminders</li><li>Customer service inquiries</li><li>Lead qualification</li><li>Follow-up calls</li></ul><blockquote>\"This system handles 80% of our calls perfectly. Our team can focus on complex cases.\" - Sarah, Operations Manager</blockquote><p>The system integrates seamlessly with your existing tools and learns from every interaction to improve over time.</p>"
}
```

## Important Notes

1. **No Line Breaks in JSON**: All HTML must be in one line within the JSON string
2. **Escape Quotes**: Use `\"` for quotes inside the HTML
3. **Image Paths**: Use relative paths from the root (e.g., `assets/images/...`)
4. **Responsive**: All images and videos are automatically responsive
5. **Styling**: All elements are pre-styled to match the site design

## Tips

- Use `<h2>` for main sections
- Use `<h3>` for subsections
- Use `<ul>` with `<strong>` labels for feature lists
- Use `<ol>` for step-by-step processes
- Add images to break up long text sections
- Use blockquotes for testimonials or important notes
