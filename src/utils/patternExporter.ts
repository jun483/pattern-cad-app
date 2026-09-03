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
  locale: string = "ja", // 👈 ロケールを受け取れるように引数を追加
) {
  try {
    // 多言語用のラベル定義
    const t = {
      ja: {
        popupBlocked:
          "ポップアップがブロックされました。ブラウザの設定をご確認ください。",
        title: "小田原ミシン - プロフェッショナルパターン出力",
        item: "アイテム",
        bustLabel: "基準ヌード寸法 (Bust)",
        unit: "単位",
        calcWidth: "計算幅 (Width)",
        calcHeight: "計算高 (Height)",
        outputDate: "出力日時",
        printButton: "印刷を実行する",
      },
      en: {
        popupBlocked: "Pop-up blocked. Please check your browser settings.",
        title: "Odawara Sewing - Professional Pattern Output",
        item: "Item",
        bustLabel: "Bust",
        unit: "Unit",
        calcWidth: "Width",
        calcHeight: "Height",
        outputDate: "Output Date",
        printButton: "Execute Print",
      },
      fr: {
        popupBlocked:
          "Fenêtre pop-up bloquée. Veuillez vérifier les paramètres de votre navigateur.",
        title: "Couture Odawara - Sortie de patron professionnel",
        item: "Article",
        bustLabel: "Poitrine",
        unit: "Unité",
        calcWidth: "Largeur",
        calcHeight: "Hauteur",
        outputDate: "Date de sortie",
        printButton: "Lancer l'impression",
      },
      es: {
        popupBlocked:
          "Ventana emergente bloqueada. Compruebe la configuración del navegador.",
        title: "Costura Odawara - Salida de patrón profesional",
        item: "Artículo",
        bustLabel: "Busto",
        unit: "Unidad",
        calcWidth: "Ancho",
        calcHeight: "Alto",
        outputDate: "Fecha de salida",
        printButton: "Ejecutar impresión",
      },
      zh: {
        popupBlocked: "弹出窗口被阻止。请检查您的浏览器设置。",
        title: "小田原缝纫 - 专业纸样输出",
        item: "项目",
        bustLabel: "胸围",
        unit: "单位",
        calcWidth: "计算宽度",
        calcHeight: "计算高度",
        outputDate: "输出时间",
        printButton: "执行打印",
      },
      ko: {
        popupBlocked: "팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.",
        title: "오다와라 미싱 - 프로페셔널 패턴 출력",
        item: "아이템",
        bustLabel: "가슴둘레",
        unit: "단위",
        calcWidth: "계산 폭",
        calcHeight: "계산 높이",
        outputDate: "출력 일시",
        printButton: "인쇄 실행",
      },
    }[locale] || {
      // フォールバック（英語）
      popupBlocked: "Pop-up blocked. Please check your browser settings.",
      title: "Odawara Sewing - Professional Pattern Output",
      item: "Item",
      bustLabel: "Bust",
      unit: "Unit",
      calcWidth: "Width",
      calcHeight: "Height",
      outputDate: "Output Date",
      printButton: "Execute Print",
    };

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert(t.popupBlocked);
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${locale}">
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
          <h2>${t.title}</h2>
          <p><strong>${t.item}:</strong> ${category.toUpperCase()} | <strong>${t.bustLabel}:</strong> ${bust}cm | <strong>${t.unit}:</strong> ${unitSystem.toUpperCase()}</p>
        </div>
        <div class="specs">
          <p><strong>${t.calcWidth}:</strong> ${width.toFixed(1)} px</p>
          <p><strong>${t.calcHeight}:</strong> ${height.toFixed(1)} px</p>
          <p><strong>${t.outputDate}:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <div class="preview-box">
          <div class="grainline"></div>
          <div style="text-align: center; font-weight: bold; color: #334155;">
            [ ${category.toUpperCase()} PATTERN ]<br>
            W: ${width.toFixed(1)} / H: ${height.toFixed(1)}
          </div>
        </div>
        <div class="no-print" style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">${t.printButton}</button>
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
