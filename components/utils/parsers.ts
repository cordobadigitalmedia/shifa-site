export function isAbsoluteLink(url: string): boolean {
  try {
    if (url.startsWith("mailto:")) {
      return true
    }
    const parsedUrl = new URL(url)
    return !!parsedUrl.protocol && !!parsedUrl.host
  } catch {
    // If the URL constructor throws an error, it's not a valid absolute URL.
    return false
  }
}

export function createHtmlTable(data: [string, FormDataEntryValue][]) {
  const tableRows = data
    .map(
      ([key, value]) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"><b>${key}</b></td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${value}</td>
      </tr>
    `
    )
    .join("")

  return `
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f2f2f2;">Field</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f2f2f2;">Value</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `
}
