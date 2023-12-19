function validatePassword(value: string) {
  if (value.length < 8) {
    return 'رمز عبور نباید کمتر از 8 کاراکتر باشد';
  }

  if (!/[a-z]/.test(value)) {
    return 'رمز عبور باید حداقل یک حرف کوچک داشته باشد';
  }

  if (!/[A-Z]/.test(value)) {
    return 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد';
  }

  if (!/[0-9]/.test(value)) {
    return 'رمز عبور باید حداقل یک عدد داشته باشد';
  }

  if (!/[~!@#$%^&*()_\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    return 'رمز عبور باید حداقل یک کاراکتر خاص (غیر حروف و عدد) داشته باشد';
  }

  if (value.length > 50) {
    return 'رمز عبور نباید بیشتر از 50 کاراکتر باشد';
  }

  return true; // Valid password
}

function validateUsername(value: string) {
  if (value.length < 3) {
    return 'نام کاربری  نباید کمتر از3 کاراکتر باشد';
  }

  if (!/^[a-z0-9_.]*$/.test(value)) {
    return 'نام کاربری فقط می‌تواند شامل حروف کوچک، اعداد، علائم اختصاری ( _ ) و نقطه (.) باشد';
  }

  if (value.length > 50) {
    return 'نام کاربری  نباید بیشتر از 50 کاراکتر باشد';
  }

  return true; // Valid username
}

export { validatePassword, validateUsername };
