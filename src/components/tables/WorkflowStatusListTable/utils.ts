function convertStatusToPersian(englishStatus: string) {
  switch (englishStatus) {
    case 'start':
      return 'شروع';
    case 'in-progress':
      return 'در حال انجام';
    case 'done':
      return 'اتمام';
    default:
      return 'نامعلوم';
  }
}

export { convertStatusToPersian };
