# Payload Lexical Typography

This plugin extends the default Payload Lexical editor functionality by adding more customization options for text elements.

## Core Features 🧩

- **Text color** - ability to change text color to predefined colors or selected color using color picker.
- **Font size** - ability to change font size to predefined sizes or custom size using input field.
- **Letter spacing** - ability to change letter spacing to predefined values or custom value using input field.
- **Line height** - ability to change line height to predefined values or custom value using input field.
- **Font family** (coming soon)

## Installation 📦

To get plugin up and running, follow these steps:

1. **Install package from NPM:**

   ```bash
   pnpm add payload-lexical-typography
   # OR
   npm install payload-lexical-typography
   ```

2. **Add features you want to include in your lexical editor config, you can also pass additional props:**

   ```ts
   import { lexicalEditor } from "@payloadcms/richtext-lexical";
   import { TextColorFeature, TextSizeFeature, TextLetterSpacingFeature, TextLineHeightFeature, TextClassFeature } from "payload-lexical-typography";

   lexicalEditor({
     features: () => {
       return [
         TextColorFeature({
           colors: ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"],
         }),
         TextSizeFeature(),
         TextClassFeature(),
         TextLetterSpacingFeature(),
         TextLineHeightFeature(),
       ];
     },
   });
   ```

3. **Add converters to your RichText component**

   ⚠️ Warning: Starting from version **0.1.0**, converters **must** be imported from the `/converters` submodule instead of `/client`.

   ### JSX Converters

   ```tsx
   import { TypographyJSXConverters } from "payload-lexical-typography/converters";

   const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
     ...defaultConverters,
     ...TypographyJSXConverters,
   });
   ```

   ### HTML Converters

   For HTML converter, use `TypographyHTMLConverters` instead of `TypographyJSXConverters`, from `/converters` submodule.

## Configuration 🛠

### TextColorFeature

<table style="width: 100%">
  <tr>
    <th style="width: 15%">Option</th>
    <th style="width: 25%">Type</th>
    <th style="width: 25%">Default</th>
    <th style="width: 40%">Description</th>
  </tr>
  <tr>
    <td><code>colors</code></td>
    <td><code>Array&lt;string&gt; | Array<{value: string, label: string}></code></td>
    <td><code>[]</code></td>
    <td>Defines the color palette available in the color picker's predefined section. Each color should be a valid CSS color value (hex, RGB, etc.). If you pass values with label, it will automatically switch to list view instead.</td>
  </tr>
  <tr>
    <td><code>colorPicker</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>By setting this to <code>false</code>, you can hide the color picker, limiting users to selecting only from the predefined colors.</td></td>
  </tr>
  <tr>
    <td><code>listView</code></td>
    <td><code>boolean</code></td>
    <td><code>undefined</code></td>
    <td>Allows you to manually switch from list to grid view and vice versa. It has higher priority than colors array type.</td>
  </tr>
</table>

### TextSizeFeature

<table style="width: 100%">
  <tr>
    <th style="width: 15%">Option</th>
    <th style="width: 25%">Type</th>
    <th style="width: 25%">Default</th>
    <th style="width: 40%">Description</th>
  </tr>
  <tr>
    <td><code>sizes</code></td>
    <td><code>Array&lt;{value: string, label: string}&gt;</code></td>
    <td><code>[]</code></td>
    <td>Specifies the font size presets available in the size picker. Each size needs both a display label and CSS value.</td>
  </tr>
  <tr>
    <td><code>method</code></td>
    <td><code>"replace" | "combine"</code></td>
    <td><code>"replace"</code></td>
    <td>Determines whether custom sizes replace the defaults (<code>"replace"</code>) or are added to them (<code>"combine"</code>).</td>
  </tr>
  <tr>
    <td><code>scroll</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>If <code>true</code>, sizes over the first 4 will be accessible via scrolling within a fixed container height. If <code>false</code>, the picker will expand vertically to accommodate all size options.</td>
  </tr>
  <tr>
    <td><code>customSize</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>By setting this to <code>false</code>, you hide the custom size input field, limiting users to selecting only from the predefined size options.</td>
  </tr>
</table>

### TextLetterSpacingFeature

<table style="width: 100%">
  <tr>
    <th style="width: 15%">Option</th>
    <th style="width: 25%">Type</th>
    <th style="width: 25%">Default</th>
    <th style="width: 40%">Description</th>
  </tr>
  <tr>
    <td><code>spacings</code></td>
    <td><code>Array&lt;{value: string, label: string}&gt;</code></td>
    <td><code>[]</code></td>
    <td>Specifies the letter spacing presets available in the letter spacing picker. Each spacing needs both a display label and CSS value.</td>
  </tr>
  <tr>
    <td><code>method</code></td>
    <td><code>"replace" | "combine"</code></td>
    <td><code>"replace"</code></td>
    <td>Determines whether custom spacings replace the defaults (<code>"replace"</code>) or are added to them (<code>"combine"</code>).</td>
  </tr>
  <tr>
    <td><code>scroll</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>If <code>true</code>, spacings over the first 4 will be accessible via scrolling within a fixed container height. If <code>false</code>, the picker will expand vertically to accommodate all spacing options.</td>
  </tr>
  <tr>
    <td><code>customSpacing</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>By setting this to <code>false</code>, you hide the custom letter spacing input field, limiting users to selecting only from the predefined spacing options.</td>
  </tr>
</table>

### TextLineHeightFeature

<table style="width: 100%">
  <tr>
    <th style="width: 15%">Option</th>
    <th style="width: 25%">Type</th>
    <th style="width: 25%">Default</th>
    <th style="width: 40%">Description</th>
  </tr>
  <tr>
    <td><code>lineHeights</code></td>
    <td><code>Array&lt;{value: string, label: string}&gt;</code></td>
    <td><code>[]</code></td>
    <td>Specifies the line height presets available in the line height picker. Each line height needs both a display label and CSS value.</td>
  </tr>
  <tr>
    <td><code>method</code></td>
    <td><code>"replace" | "combine"</code></td>
    <td><code>"replace"</code></td>
    <td>Determines whether custom sizes replace the defaults (<code>"replace"</code>) or are added to them (<code>"combine"</code>).</td>
  </tr>
  <tr>
    <td><code>scroll</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>If <code>true</code>, line heights over the first 4 will be accessible via scrolling within a fixed container height. If <code>false</code>, the picker will expand vertically to accommodate all line height options.</td>
  </tr>
  <tr>
    <td><code>customLineHeight</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>By setting this to <code>false</code>, you hide the custom line height input field, limiting users to selecting only from the predefined line height options.</td>
  </tr>
</table>

### TextClassFeature

<table style="width: 100%">
  <tr>
    <th style="width: 15%">Option</th>
    <th style="width: 25%">Type</th>
    <th style="width: 25%">Default</th>
    <th style="width: 40%">Description</th>
  </tr>
  <tr>
    <td><code>classes</code></td>
    <td><code>Array&lt;{value: string, label: string}&gt;</code></td>
    <td><code>[]</code></td>
    <td>Specifies the class name available in the picker. Each class needs both a display label and CSS value.</td>
  </tr>
  <tr>
    <td><code>scroll</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>If <code>true</code>, classes over the first 4 will be accessible via scrolling within a fixed container height. If <code>false</code>, the picker will expand vertically to accommodate all class options.</td>
  </tr>
</table>

### Shared Options

<table style="width: 100%">
  <tr>
    <th style="width: 15%">Option</th>
    <th style="width: 25%">Type</th>
    <th style="width: 25%">Default</th>
    <th style="width: 40%">Description</th>
  </tr>
  <tr>
    <td><code>hideAttribution</code></td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
    <td>Controls visibility of attribution. <strong>If using in commercial products or for profit</strong>, consider <a href="#support-the-project">supporting the author</a> or keeping the attribution.</td>
  </tr>
</table>

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing 🤝

If you have any ideas on how this plugin can be improved, please feel free to open an issue or a pull request.

## Contact 📧

If you have any questions, feel free to reach out to me at [adrianmaj1122@gmail.com](mailto:adrianmaj1122@gmail.com), or on my Linkedin profile [Adrian Maj](https://www.linkedin.com/in/adrianmaj/).

## Support the Project

If you find this plugin useful, you can support the project by giving it a ⭐️, or [buying me a coffee ☕️](https://buymeacoffee.com/adrianmaj), for motivation to keep working on it. Thanks for your support!
