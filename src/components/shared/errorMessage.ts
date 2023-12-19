export const handleErrorMessage = (errorStatus: number, mode?: string) => {
  if (errorStatus === 404) {
    return ' با پشتیبانی تماس بگیرید';
  } else if (errorStatus === 409) {
    return `این ${mode} قبلا ثبت شده است`;
  } else if (errorStatus === 403) {
    if (mode === 'کامنت') return ' بعد از تعیین وضعیت امکان ثبت نظر وجود ندارد';
    return 'شما به این بخش دسترسی ندارید';
  } else if (errorStatus === 422) {
    return 'پیش فاکتورها را آپلود کنید';
  } else if (errorStatus === 500) {
    return 'خطای سرور . با پشتیبانی تماس بگیرید';
  } else {
    return ' با پشتیبانی تماس بگیرید';
  }
};
