// Casos en public/automatizaciones/<carpeta>/
// renombrador/ → entrega-de-catalogo
// asistente-excel/ → anotacion-en-excel (cover + capturas del panel)
// panel-d/ → panel-procesos-documentos (cover desktop + movil.png en marco de teléfono)

export const WHATSAPP_NUMBER = '5930968572318';

export const ui = {
  es: {
    title: 'Automatizaciones',
    seeCase: 'Ver caso →',
    viewFull: 'Ver completo',
    close: 'Cerrar',
    moreInfoTitle: '¿Quieres algo parecido?',
    moreInfoText:
      'Cuéntame qué proceso quieres automatizar y te oriento sobre opciones y alcance.',
    moreInfoCta: 'Quiero más información',
    whatsappMessage:
      'Hola! Vi la sección de Automatizaciones y quisiera más información.',
  },
  en: {
    title: 'Automations',
    seeCase: 'See case →',
    viewFull: 'View full',
    close: 'Close',
    moreInfoTitle: 'Want something like this?',
    moreInfoText:
      'Tell me which process you want to automate and I will help with options and scope.',
    moreInfoCta: 'I want more information',
    whatsappMessage:
      'Hi! I saw the Automations section and I would like more information.',
  },
};

export const cases = [
  {
    slug: 'entrega-de-catalogo',
    cover: '/automatizaciones/renombrador/cover.png',
    photos: [
      { src: '/automatizaciones/renombrador/1.png', id: 'listado' },
      { src: '/automatizaciones/renombrador/2.png', id: 'fotos' },
      { src: '/automatizaciones/renombrador/3.png', id: 'grupos' },
      { src: '/automatizaciones/renombrador/cover.png', id: 'producto' },
    ],
    es: {
      client: 'Entrega de catálogo',
      business: 'Renombrado de fotos',
      caseLabel: 'El caso',
      caseText:
        'Cada semana hay que renombrar más de mil fotos de catálogo, y se hace a mano, una por una. Salen de edición con el nombre de la cámara, todas juntas en una carpeta. Alguien abre el Excel, busca el producto, escribe el código del cliente, elige la línea y mueve el archivo a su carpeta.',
      solutionLabel: 'La solución',
      solutionText:
        'La herramienta lee ese Excel. Cruza cada archivo con su producto, cambia IMG_2995 por el código final y lo mueve a la carpeta de su línea. El lote queda ordenado y listo para enviar, sin abrir foto por foto.',
      gainsLabel: 'Mejoras',
      gainsText:
        'El renombrado es más rápido y deja menos errores de tipeo, porque el código ya no se escribe a mano. El tiempo que antes se iba en mil nombres queda para organizar el lote y revisar que cada línea esté completa.',
      steps: [
        {
          name: 'Excel',
          detail: 'Código original, código del cliente, línea y número de inicio',
        },
        {
          name: 'Renombrar',
          detail: 'De IMG_2995 al código del cliente, y luego 09, 10, 11',
        },
        {
          name: 'Carpetas',
          detail: 'Una carpeta por línea, con el lote listo para enviar',
        },
      ],
      screens: {
        listado: {
          step: 'Paso 2',
          title: 'Cargar listado',
          detail: 'El Excel define categorías, códigos y secuencia',
        },
        fotos: {
          step: 'Paso 4',
          title: 'Fotos por grupos',
          detail: 'El pool se separa según el listado',
        },
        grupos: {
          step: 'Paso 5',
          title: 'Renombrar por grupos',
          detail: 'Avance, destino y lote activo',
        },
        producto: {
          step: 'Paso 5',
          title: 'Producto',
          detail: 'De 2177.jpg a 40633078_01, en orden',
        },
      },
    },
    en: {
      client: 'Catalog delivery',
      business: 'Photo renaming',
      caseLabel: 'The case',
      caseText:
        'More than a thousand catalog photos have to be renamed every week, and it is done by hand, one by one. They leave editing with the camera filename, all in one folder. Someone opens the spreadsheet, finds the product, types the client code, picks the line, and moves the file into its folder.',
      solutionLabel: 'The solution',
      solutionText:
        'The tool reads that spreadsheet. It matches each file to its product, turns IMG_2995 into the final code, and moves it into the folder for its line. The batch leaves sorted and ready to send, without opening photo after photo.',
      gainsLabel: 'Improvements',
      gainsText:
        'Renaming is faster, with fewer typing mistakes, because the code is no longer written by hand. The time that used to go into a thousand names is free for organizing the batch and checking that each line is complete.',
      steps: [
        {
          name: 'Excel',
          detail: 'Original code, client code, line, and start number',
        },
        {
          name: 'Rename',
          detail: 'From IMG_2995 to the client code, then 09, 10, 11',
        },
        {
          name: 'Folders',
          detail: 'One folder per line, with the batch ready to send',
        },
      ],
      screens: {
        listado: {
          step: 'Step 2',
          title: 'Load the list',
          detail: 'The spreadsheet sets categories, codes, and sequence',
        },
        fotos: {
          step: 'Step 4',
          title: 'Photos by group',
          detail: 'The pool is split from the list',
        },
        grupos: {
          step: 'Step 5',
          title: 'Rename by group',
          detail: 'Progress, destination, and active batch',
        },
        producto: {
          step: 'Step 5',
          title: 'Product',
          detail: 'From 2177.jpg to 40633078_01, in order',
        },
      },
    },
  },
  {
    slug: 'anotacion-en-excel',
    cover: '/automatizaciones/asistente-excel/image-81.webp',
    photos: [
      { src: '/automatizaciones/asistente-excel/2.png', id: 'buscar' },
      { src: '/automatizaciones/asistente-excel/image.png', id: 'completar' },
    ],
    es: {
      client: 'Anotación en Excel',
      business: 'Google Sheets',
      caseLabel: 'El caso',
      caseText:
        'Llenar un listado a mano mientras se trabaja es lento: buscar el producto, saltar de celda en celda, escribir códigos, cantidades y comentarios, y no perder el hilo. Un error de tipeo o una fila equivocada se nota tarde. Este caso es un asistente de fotografía en Google Sheets: durante la sesión hay que anotar, por cada producto, el surtido y los números de foto, sin pelearse con la hoja.',
      solutionLabel: 'La solución',
      solutionText:
        'Un panel lateral en Sheets. Se escribe una parte del código (últimos 4 a 6 dígitos, o un código con letras), se busca en las columnas A, B y C, se elige el producto y se guarda surtido, fotos consecutivas o sueltas, y el comentario. La fila se marca y la referencia de la última foto sigue lista para el siguiente.',
      gainsLabel: 'Mejoras',
      gainsText:
        'La anotación queda en el panel, no en celdas sueltas. Hay menos errores de tipeo, menos tiempo perdido buscando filas, y más atención en lo que se está registrando —en este caso, la sesión de fotos.',
      steps: [
        {
          name: 'Buscar',
          detail: 'Código parcial en A, B o C; una o varias coincidencias',
        },
        {
          name: 'Completar',
          detail: 'Surtido, fotos consecutivas o específicas, y comentario',
        },
        {
          name: 'Guardar',
          detail: 'Escribe en la hoja, pinta la fila y actualiza la referencia',
        },
      ],
      screens: {
        buscar: {
          step: '01',
          title: 'Buscar producto',
          detail: 'Referencia de cámara y código en la hoja',
        },
        completar: {
          step: '02',
          title: 'Códigos y comentarios',
          detail: 'Rango de fotos, saltos y marcas para edición',
        },
      },
    },
    en: {
      client: 'Excel annotation',
      business: 'Google Sheets',
      caseLabel: 'The case',
      caseText:
        'Filling a spreadsheet by hand while you work is slow: find the product, jump cell to cell, type codes, quantities, and comments, and try not to lose your place. A typing mistake or the wrong row shows up late. This case is a photography assistant in Google Sheets: during the shoot you have to log, for each product, the assortment and the photo numbers, without fighting the sheet.',
      solutionLabel: 'The solution',
      solutionText:
        'A sidebar panel in Sheets. You type part of the code (last 4 to 6 digits, or a code with letters), search columns A, B, and C, pick the product, and save assortment, consecutive or specific photo numbers, and the comment. The row is marked and the last photo reference stays ready for the next one.',
      gainsLabel: 'Improvements',
      gainsText:
        'Logging stays in the panel, not in scattered cells. There are fewer typing mistakes, less time spent hunting for rows, and more attention on what is being recorded —in this case, the photo session.',
      steps: [
        {
          name: 'Search',
          detail: 'Partial code in A, B, or C; one or several matches',
        },
        {
          name: 'Fill in',
          detail: 'Assortment, consecutive or specific photos, and a comment',
        },
        {
          name: 'Save',
          detail: 'Writes to the sheet, paints the row, and updates the reference',
        },
      ],
      screens: {
        buscar: {
          step: '01',
          title: 'Search product',
          detail: 'Camera reference and code lookup on the sheet',
        },
        completar: {
          step: '02',
          title: 'Codes and comments',
          detail: 'Photo range, skips, and edit tags',
        },
      },
    },
  },
  {
    slug: 'panel-procesos-documentos',
    cover: '/automatizaciones/panel-d/cover.png',
    phone: {
      src: '/automatizaciones/panel-d/movil.png',
      id: 'movil',
    },
    imageCaptions: false,
    photos: [
      { src: '/automatizaciones/panel-d/documentos.png', id: 'documentos' },
      { src: '/automatizaciones/panel-d/login.png', id: 'login' },
    ],
    es: {
      client: 'Expedientes multiempresa',
      business: 'Procesos, documentos y acceso',
      caseLabel: 'El caso',
      caseText:
        'Había que llevar procesos y documentos de varias empresas a la vez: contratos, pólizas, facturas, actas y certificados, cada uno con su estado. El seguimiento se repartía entre carpetas, hojas y mensajes. Saber qué faltaba en un expediente, o pasar de una empresa a otra sin perder el hilo, costaba tiempo y dejaba huecos.',
      solutionLabel: 'La solución',
      solutionText: [
        'Un solo panel web (y móvil) para varias empresas',
        'Vista general con totales, estados, búsqueda y filtros',
        'Detalle de cada proceso con cambio de estado',
        'Carpetas de documentos por tipo',
        'Vista previa de PDF, Word o Excel en el panel',
        'Subida de varios archivos a la vez',
        'Compartir directo por email, WhatsApp u otros canales',
        'Login seguro con expiración de sesión por tiempo',
        'Cambio de empresa sin salir del flujo',
      ],
      gainsLabel: 'Mejoras',
      gainsText: [
        'Una herramienta para varias empresas, no carpetas sueltas',
        'Estado y documentos visibles de un vistazo, en escritorio y móvil',
        'Revisar archivos sin tener que descargarlos',
        'Más control sobre lo cerrado, en curso o incompleto',
        'Acceso acotado por sesión',
      ],
      steps: [
        {
          name: 'Vista general',
          detail: 'Totales, montos, estados y listado de procesos por empresa',
        },
        {
          name: 'Documentos',
          detail: 'Vista previa de PDF, Word o Excel sin salir del panel',
        },
        {
          name: 'Acceso',
          detail: 'Login seguro con expiración de sesión por tiempo',
        },
      ],
      screens: {},
    },
    en: {
      client: 'Multi-company case files',
      business: 'Processes, documents & access',
      caseLabel: 'The case',
      caseText:
        'Processes and documents for several companies had to be tracked at once: contracts, policies, invoices, minutes, and certificates, each with its own status. Follow-up lived across folders, sheets, and messages. Knowing what was missing in a file, or switching companies without losing the thread, took time and left gaps.',
      solutionLabel: 'The solution',
      solutionText: [
        'One web panel (and mobile) for several companies',
        'Overview with totals, statuses, search, and filters',
        'Process detail with status changes',
        'Document folders by type',
        'In-panel preview of PDF, Word, or Excel',
        'Upload several files at once',
        'Share directly by email, WhatsApp, or other channels',
        'Secure login with timed session expiration',
        'Switch companies without leaving the workflow',
      ],
      gainsLabel: 'Improvements',
      gainsText: [
        'One tool for several companies, not scattered folders',
        'Status and documents visible at a glance, on desktop and mobile',
        'Review files without downloading them',
        'More control over what is closed, in progress, or incomplete',
        'Access bounded by session',
      ],
      steps: [
        {
          name: 'Overview',
          detail: 'Totals, amounts, statuses, and process list per company',
        },
        {
          name: 'Documents',
          detail: 'In-panel preview of PDF, Word, or Excel',
        },
        {
          name: 'Access',
          detail: 'Secure login with timed session expiration',
        },
      ],
      screens: {},
    },
  },
];
