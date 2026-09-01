// src/i18n/dictionary.ts

export type Language = "ja" | "en" | "fr" | "es";

export interface Dictionary {
  appTitle: string;
  language: string;
  activeCategory: string;
  beginnerGuide: string;
  proVector: string;
  dxfExport: string;
  pdfExport: string;
  realtimeData: string;
  targetItem: string;
  bodyWidth: string;
  bodyHeight: string;
  hStretch: string;
  vStretch: string;
  frontBody: string;
  backBody: string;
  petPattern: string;
  bustLine: string;
  vectorEngineRunning: string;

  tabCanvas2D: string;
  tabViewer3D: string;
  tabNesting: string;
  tabSpecSheet: string;
  tabDxfExporter: string;
  tabPdfGenerator: string;
  brandFooter: string;

  modeSwitch: string;
  beginner: string;
  professional: string;
  unitSystemLabel: string;
  proOptions: string;
  proOptionsDesc: string;

  patternDimensionsTitle: string;
  itemSelection: string;
  lessonBag: string;
  shoeBag: string;
  basicShirt: string;
  basicSkirt: string;
  finishedWidth: string;
  finishedHeight: string;
  bottomDepth: string;
  nudeBust: string;
  nudeWaist: string;

  specSheetTitle: string;
  specSheetSub: string;
  beginnerSpec: string;
  proSpec: string;
  printSpecSheet: string;
  officialSpec: string;
  productSpecTitle: string;
  issueDate: string;
  statusLabel: string;
  statusAutoCalc: string;
  personalMeasurementCriteria: string;
  bustCriteria: string;
  waistCriteria: string;
  hipCriteria: string;
  backLengthCriteria: string;
  fabricSimulation: string;
  hStretchLabel: string;
  vStretchLabel: string;
  seamAllowanceDefault: string;
  miterProcessing: string;
  enabledText: string;
  sewingProcessTitle: string;
  processNo: string;

  // Torso3DView 用に追加されたプロパティ
  title3D: string;
  desc3D: string;
  beginnerVisualizer: string;
  pro3DAnalysis: string;
  status3D: string;
  torsoWidth: string;
  torsoDepth: string;
  torsoHeight: string;
  footer3DTitle: string;
  footer3DDesc: string;

  workName?: string;
  machineAttachment?: string;
  techNotes?: string;
  step01Name?: string;
  step01Machine?: string;
  step01Note?: string;
  step02Name?: string;
  step02Machine?: string;
  step02Note?: string;
  step03Name?: string;
  step03Machine?: string;
  step03Note?: string;
  footerMessage?: string;
}

const dictionaries: Record<Language, Dictionary> = {
  ja: {
    appTitle: "プロフェッショナル 2D パターンCAD",
    language: "言語",
    activeCategory: "アイテム",
    beginnerGuide: "初心者ガイド",
    proVector: "プロベクター",
    dxfExport: "DXF出力",
    pdfExport: "PDF印刷",
    realtimeData: "リアルタイム製図データ",
    targetItem: "対象アイテム",
    bodyWidth: "幅寸法",
    bodyHeight: "高さ寸法",
    hStretch: "横ストレッチ",
    vStretch: "縦ストレッチ",
    frontBody: "前身頃 (Front)",
    backBody: "後身頃 (Back)",
    petPattern: "ペットウェアパターン",
    bustLine: "バスト基準",
    vectorEngineRunning:
      "高精度ベクトル演算エンジン稼働中 - 縫い代・合印・地目線自動アライメント",

    tabCanvas2D: "2Dパターン製図",
    tabViewer3D: "3D着せ替え",
    tabNesting: "用尺ネスト",
    tabSpecSheet: "仕様書 (Spec)",
    tabDxfExporter: "DXF出力",
    tabPdfGenerator: "PDF一括印刷",
    brandFooter: "Professional CAD Engine",

    modeSwitch: "モード切替",
    beginner: "初心者",
    professional: "プロフェッショナル",
    unitSystemLabel: "単位系",
    proOptions: "プロフェッショナルオプション",
    proOptionsDesc: "高度なCAD機能とCADデータを有効化",

    patternDimensionsTitle: "パターン寸法設定",
    itemSelection: "アイテム選択",
    lessonBag: "レッスンバッグ",
    shoeBag: "シューズバッグ",
    basicShirt: "ベーシックシャツ",
    basicSkirt: "ベーシックスカート",
    finishedWidth: "仕上がり幅 (cm)",
    finishedHeight: "仕上がり丈 (cm)",
    bottomDepth: "マチ (cm)",
    nudeBust: "ヌードバスト (cm)",
    nudeWaist: "ヌードウエスト (cm)",

    specSheetTitle: "製品仕様書 (Specification)",
    specSheetSub: "CAD自動生成データ",
    beginnerSpec: "簡易スペック",
    proSpec: "プロフェッショナルスペック",
    printSpecSheet: "仕様書を印刷する",
    officialSpec: "公式生産仕様書",
    productSpecTitle: "パターン生産管理仕様書",
    issueDate: "発行日",
    statusLabel: "ステータス",
    statusAutoCalc: "自動計算連動中",
    personalMeasurementCriteria: "身体計測・設計基準",
    bustCriteria: "バスト基準値",
    waistCriteria: "ウエスト基準値",
    hipCriteria: "ヒップ基準値",
    backLengthCriteria: "背丈基準値",
    fabricSimulation: "生地・ストレッチシミュレーション",
    hStretchLabel: "横ストレッチ率",
    vStretchLabel: "縦ストレッチ率",
    seamAllowanceDefault: "標準縫い代",
    miterProcessing: "角額縁縫い処理",
    enabledText: "有効",
    sewingProcessTitle: "縫製工程順序",
    processNo: "工程番号",

    title3D: "3D人体トルソー着せ替えシミュレーション",
    desc3D: "立体空間上でのシルエット・ドレーピング確認",
    beginnerVisualizer: "簡易3Dビジュアライザー",
    pro3DAnalysis: "プロフェッショナル3D立体解析",
    status3D: "演算完了 (リアルタイム同期)",
    torsoWidth: "トルソー身幅",
    torsoDepth: "トルソー奥行き",
    torsoHeight: "トルソー全高",
    footer3DTitle: "高度な3Dドレープ連動",
    footer3DDesc: "2Dパターン変更が即座に3D立体形状へ反映されます。",
  },
  en: {
    appTitle: "Professional 2D Pattern CAD",
    language: "Lang",
    activeCategory: "Category",
    beginnerGuide: "Beginner",
    proVector: "Pro Vector",
    dxfExport: "DXF Export",
    pdfExport: "PDF Print",
    realtimeData: "Realtime Draft Data",
    targetItem: "Target",
    bodyWidth: "Width",
    bodyHeight: "Height",
    hStretch: "H-Stretch",
    vStretch: "V-Stretch",
    frontBody: "Front Body",
    backBody: "Back Body",
    petPattern: "Pet Wear Pattern",
    bustLine: "Bust Ref",
    vectorEngineRunning:
      "Precision Vector Engine Active - Automatic Seam, Notch & Grainline Alignment",

    tabCanvas2D: "2D Pattern",
    tabViewer3D: "3D Viewer",
    tabNesting: "Nesting",
    tabSpecSheet: "Spec Sheet",
    tabDxfExporter: "DXF Export",
    tabPdfGenerator: "PDF Print",
    brandFooter: "Professional CAD Engine",

    modeSwitch: "Mode Switch",
    beginner: "Beginner",
    professional: "Professional",
    unitSystemLabel: "Unit System",
    proOptions: "Pro Options",
    proOptionsDesc: "Enable advanced CAD tools and data export",

    patternDimensionsTitle: "Pattern Dimensions",
    itemSelection: "Item Selection",
    lessonBag: "Lesson Bag",
    shoeBag: "Shoe Bag",
    basicShirt: "Basic Shirt",
    basicSkirt: "Basic Skirt",
    finishedWidth: "Finished Width (cm)",
    finishedHeight: "Finished Height (cm)",
    bottomDepth: "Bottom Depth (cm)",
    nudeBust: "Nude Bust (cm)",
    nudeWaist: "Nude Waist (cm)",

    specSheetTitle: "Product Specification",
    specSheetSub: "Auto-generated CAD Data",
    beginnerSpec: "Basic Spec",
    proSpec: "Professional Spec",
    printSpecSheet: "Print Spec Sheet",
    officialSpec: "Official Production Spec",
    productSpecTitle: "Pattern Production Control Sheet",
    issueDate: "Issue Date",
    statusLabel: "Status",
    statusAutoCalc: "Auto-Calc Linked",
    personalMeasurementCriteria: "Body Measurement & Design Criteria",
    bustCriteria: "Bust Criteria",
    waistCriteria: "Waist Criteria",
    hipCriteria: "Hip Criteria",
    backLengthCriteria: "Back Length Criteria",
    fabricSimulation: "Fabric & Stretch Simulation",
    hStretchLabel: "Horizontal Stretch",
    vStretchLabel: "Vertical Stretch",
    seamAllowanceDefault: "Default Seam Allowance",
    miterProcessing: "Miter Corner Processing",
    enabledText: "Enabled",
    sewingProcessTitle: "Sewing Process Order",
    processNo: "Process No.",

    title3D: "3D Torso Draping Simulation",
    desc3D: "Verify silhouette and draping in 3D space",
    beginnerVisualizer: "Beginner 3D Visualizer",
    pro3DAnalysis: "Professional 3D Volumetric Analysis",
    status3D: "Calculation Complete (Realtime Sync)",
    torsoWidth: "Torso Width",
    torsoDepth: "Torso Depth",
    torsoHeight: "Torso Height",
    footer3DTitle: "Advanced 3D Drape Integration",
    footer3DDesc: "2D pattern modifications instantly update the 3D shape.",
  },
  fr: {
    appTitle: "CAO de Patron 2D Professionnel",
    language: "Langue",
    activeCategory: "Catégorie",
    beginnerGuide: "Débutant",
    proVector: "Pro Vector",
    dxfExport: "Export DXF",
    pdfExport: "Impression PDF",
    realtimeData: "Données en Temps Réel",
    targetItem: "Article",
    bodyWidth: "Largeur",
    bodyHeight: "Hauteur",
    hStretch: "Étir. H",
    vStretch: "Étir. V",
    frontBody: "Devant",
    backBody: "Dos",
    petPattern: "Patron Animal",
    bustLine: "Réf Buste",
    vectorEngineRunning:
      "Moteur vectoriel actif - Alignement automatique des coutures et repères",

    tabCanvas2D: "Patron 2D",
    tabViewer3D: "Aperçu 3D",
    tabNesting: "Placement",
    tabSpecSheet: "Fiche Technique",
    tabDxfExporter: "Export DXF",
    tabPdfGenerator: "Impression PDF",
    brandFooter: "Professional CAD Engine",

    modeSwitch: "Changement de mode",
    beginner: "Débutant",
    professional: "Professionnel",
    unitSystemLabel: "Système d'unités",
    proOptions: "Options Professionnelles",
    proOptionsDesc: "Activer les outils de CAO avancés",

    patternDimensionsTitle: "Dimensions du Patron",
    itemSelection: "Sélection d'article",
    lessonBag: "Sac de cours",
    shoeBag: "Sac à chaussures",
    basicShirt: "Chemise de base",
    basicSkirt: "Jupe de base",
    finishedWidth: "Largeur finie (cm)",
    finishedHeight: "Hauteur finie (cm)",
    bottomDepth: "Profondeur (cm)",
    nudeBust: "Buste nu (cm)",
    nudeWaist: "Taille nue (cm)",

    specSheetTitle: "Fiche Technique du Produit",
    specSheetSub: "Données CAO générées automatiquement",
    beginnerSpec: "Spécification basique",
    proSpec: "Spécification professionnelle",
    printSpecSheet: "Imprimer la fiche technique",
    officialSpec: "Fiche de production officielle",
    productSpecTitle: "Fiche de Contrôle de Production",
    issueDate: "Date d'émission",
    statusLabel: "Statut",
    statusAutoCalc: "Liaison de calcul automatique",
    personalMeasurementCriteria: "Critères de Mesure Corporelle",
    bustCriteria: "Critère de Buste",
    waistCriteria: "Critère de Taille",
    hipCriteria: "Critère de Hanches",
    backLengthCriteria: "Critère de Longueur de Dos",
    fabricSimulation: "Simulation de Tissu & Extensibilité",
    hStretchLabel: "Extensibilité Horizontale",
    vStretchLabel: "Extensibilité Verticale",
    seamAllowanceDefault: "Marge de couture par défaut",
    miterProcessing: "Traitement en mitre",
    enabledText: "Activé",
    sewingProcessTitle: "Ordre du Processus de Couture",
    processNo: "N° de Processus",

    title3D: "Simulation de drapé sur buste 3D",
    desc3D: "Vérifier la silhouette et le tombé en espace 3D",
    beginnerVisualizer: "Visualiseur 3D débutant",
    pro3DAnalysis: "Analyse volumétrique 3D professionnelle",
    status3D: "Calcul terminé (Sync temps réel)",
    torsoWidth: "Largeur du buste",
    torsoDepth: "Profondeur du buste",
    torsoHeight: "Hauteur du buste",
    footer3DTitle: "Intégration avancée 3D",
    footer3DDesc:
      "Les modifications 2D mettent instantanément à jour la forme 3D.",
  },
  es: {
    appTitle: "CAD de Patrones 2D Profesional",
    language: "Idioma",
    activeCategory: "Categoría",
    beginnerGuide: "Principiante",
    proVector: "Pro Vector",
    dxfExport: "Exportar DXF",
    pdfExport: "Imprimir PDF",
    realtimeData: "Datos en Tiempo Real",
    targetItem: "Artículo",
    bodyWidth: "Ancho",
    bodyHeight: "Alto",
    hStretch: "Estir. H",
    vStretch: "Estir. V",
    frontBody: "Delantero",
    backBody: "Espalda",
    petPattern: "Patrón Mascotas",
    bustLine: "Ref Busto",
    vectorEngineRunning:
      "Motor vectorial activo - Alineación automática de costuras y muescas",

    tabCanvas2D: "Patrón 2D",
    tabViewer3D: "Visor 3D",
    tabNesting: "Distribución",
    tabSpecSheet: "Hoja de Especificaciones",
    tabDxfExporter: "Exportar DXF",
    tabPdfGenerator: "Imprimir PDF",
    brandFooter: "Professional CAD Engine",

    modeSwitch: "Cambio de Modo",
    beginner: "Principiante",
    professional: "Profesional",
    unitSystemLabel: "Sistema de Unidades",
    proOptions: "Opciones Profesionales",
    proOptionsDesc: "Habilitar herramientas CAD avanzadas",

    patternDimensionsTitle: "Dimensiones del Patrón",
    itemSelection: "Selección de Artículo",
    lessonBag: "Bolso de lección",
    shoeBag: "Bolsa de zapatos",
    basicShirt: "Camisa básica",
    basicSkirt: "Falda básica",
    finishedWidth: "Ancho terminado (cm)",
    finishedHeight: "Alto terminado (cm)",
    bottomDepth: "Profundidad (cm)",
    nudeBust: "Busto desnudo (cm)",
    nudeWaist: "Cintura desnuda (cm)",

    specSheetTitle: "Especificación del Producto",
    specSheetSub: "Datos CAD generados automáticamente",
    beginnerSpec: "Especificación Básica",
    proSpec: "Especificación Profesional",
    printSpecSheet: "Imprimir Hoja de Especificaciones",
    officialSpec: "Especificación de Producción Oficial",
    productSpecTitle: "Hoja de Control de Producción",
    issueDate: "Fecha de Emisión",
    statusLabel: "Estado",
    statusAutoCalc: "Cálculo Automático Vinculado",
    personalMeasurementCriteria: "Criterios de Medición Corporal",
    bustCriteria: "Criterio de Busto",
    waistCriteria: "Criterio de Cintura",
    hipCriteria: "Criterio de Cadera",
    backLengthCriteria: "Criterio de Largo de Espalda",
    fabricSimulation: "Simulación de Tela y Estiramiento",
    hStretchLabel: "Estiramiento Horizontal",
    vStretchLabel: "Estiramiento Vertical",
    seamAllowanceDefault: "Margen de Costura Predeterminado",
    miterProcessing: "Procesamiento de Esquinas en Mitrad",
    enabledText: "Habilitado",
    sewingProcessTitle: "Orden del Proceso de Costura",
    processNo: "N° de Proceso",

    title3D: "Simulación de Drapeado en Torso 3D",
    desc3D: "Verificar la silueta y el drapeado en el espacio 3D",
    beginnerVisualizer: "Visualizador 3D para principiantes",
    pro3DAnalysis: "Análisis volumétrico 3D profesional",
    status3D: "Cálculo completado (Sincronización en tiempo real)",
    torsoWidth: "Ancho del Torso",
    torsoDepth: "Profundidad del Torso",
    torsoHeight: "Altura del Torso",
    footer3DTitle: "Integración Avanzada de Drapeado 3D",
    footer3DDesc:
      "Las modificaciones en el 2D se reflejan instantáneamente en el 3D.",
  },
};

export function useTranslation(lang: Language): Dictionary {
  return dictionaries[lang] || dictionaries["ja"];
}
