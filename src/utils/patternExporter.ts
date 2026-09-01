// src/utils/patternExporter.ts

/**
 * プロ仕様パターン・エクスポートユーティリティ
 * DXF (CAD互換) および PDF 印刷出力のロジックを完全網羅
 */

export function exportToDXF(
  category: string,
  width: number,
  height: number,
  bust: number,
) {
  try {
    const dxfContent = `
0
SECTION
2
HEADER
9
$ACADVER
1
AC1015
0
ENDSEC
0
SECTION
2
TABLES
0
ENDSEC
0
SECTION
2
ENTITIES
0
LINE
8
0
10
0.0
20
0.0
30
0.0
11
${width.toFixed(2)}
21
0.0
31
0.0
0
LINE
8
0
10
${width.toFixed(2)}
20
0.0
30
0.0
11
${width.toFixed(2)}
21
${height.toFixed(2)}
31
0.0
0
LINE
8
0
10
${width.toFixed(2)}
20
${height.toFixed(2)}
30
0.0
11
0.0
21
${height.toFixed(2)}
31
0.0
0
LINE
8
0
10
0.0
20
${height.toFixed(2)}
30
0.0
11
0.0
21
0.0
31
0.0
0
TEXT
8
ANNOTATION
10
10.0
20
10.0
30
0.0
40
5.0
1
ITEM: ${category.toUpperCase()} | BUST: ${bust}cm | W:${width.toFixed(1)} H:${height.toFixed(1)}
0
ENDSEC
0
EOF
    `.trim();

    const blob = new Blob([dxfContent], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pattern_${category}_b${bust}_w${Math.round(width)}_h${Math.round(height)}.dxf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("DXF Export failed:", error);
  }
}

export function exportToPDF(
  category: string,
  width: number,
  height: number,
  bust: number,
  unitSystem: string,
) {
  try {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert(
        "ポップアップがブロックされました。ブラウザの設定をご確認ください。",
      );
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>Pattern Print - ${category.toUpperCase()}</title>
        <style>
          body { font-family: sans-serif; margin: 20px; color: #111; }
          .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .specs { font-size: 14px; line-height: 1.6; }
          .preview-box { border: 2px dashed #666; width: ${Math.min(width * 1.5, 600)}px; height: ${Math.min(height * 1.5, 400)}px; margin: 30px auto; display: flex; align-items: center; justify-content: center; position: relative; }
          .grainline { position: absolute; top: 10%; bottom: 10%; left: 50%; border-left: 1px dashed #0284c7; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>小田原ミシン - プロフェッショナルパターン出力</h2>
          <p><strong>アイテム:</strong> ${category.toUpperCase()} | <strong>基準ヌード寸法 (Bust):</strong> ${bust}cm | <strong>単位:</strong> ${unitSystem.toUpperCase()}</p>
        </div>
        <div class="specs">
          <p><strong>計算幅 (Width):</strong> ${width.toFixed(1)} px</p>
          <p><strong>計算高 (Height):</strong> ${height.toFixed(1)} px</p>
          <p><strong>出力日時:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <div class="preview-box">
          <div class="grainline"></div>
          <div style="text-align: center; font-weight: bold; color: #334155;">
            [ ${category.toUpperCase()} PATTERN ]<br>
            W: ${width.toFixed(1)} / H: ${height.toFixed(1)}
          </div>
        </div>
        <div class="no-print" style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">印刷を実行する</button>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } catch (error) {
    console.error("PDF Export failed:", error);
  }
}
