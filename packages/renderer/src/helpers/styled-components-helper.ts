import type { ServerStyleSheet } from 'styled-components';

export function insertStyledComponentsSheet(sheet: ServerStyleSheet) {
  try {
    const styleElements = sheet.getStyleElement();

    for (const element of styleElements) {
      const styleContent = (element.props as any).dangerouslySetInnerHTML.__html;
      RootContainer.Context.InsertStyle(styleContent);
    }
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
}
