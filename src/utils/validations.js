// Expresión regular para validar solo letras, números y un punto
const usernameRegex = /^[a-zA-Z0-9]+([.]?[a-zA-Z0-9]+)*$/;

// Expresión regular para validar un correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateEmail = (email) => {
  // Verificar si el correo electrónico está vacío
  if (!email.trim()) {
    return 'Por favor, ingresa un correo electrónico.';
  }

  // Verificar si cumple con la expresión regular de correo electrónico
  if (!emailRegex.test(email)) {
    return 'Por favor, ingresa un correo electrónico válido.';
  }

  // Si pasa la validación, retornar null (sin errores)
  return null;
};

// Expresión regular para validar un nombre con letras y espacios 
const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;

export const validateName = (name) => {
  // Verificar si el nombre está vacío
  if (!name.trim()) {
    return 'Por favor, ingresa un nombre.';
  }

  // Verificar si cumple con la expresión regular (solo letras y espacios)
  if (!nameRegex.test(name)) {
    return 'Solo puede contener letras y espacios.';
  }

  // Si pasa todas las validaciones, retornar null (sin errores)
  return null;
};

export const validateNameWithNumbers = (input) => {
  // Verificar si el campo está vacío
  if (!input.trim()) {
    return 'Por favor, ingresa un valor.';
  }

  // Expresión regular para permitir letras, números y espacios
  const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;

  // Verificar si cumple con la expresión regular
  if (!alphanumericRegex.test(input)) {
    return 'El valor solo puede contener letras, números y espacios.';
  }

  // Si pasa todas las validaciones, retornar null (sin errores)
  return null;
};

// Expresión regular para validar números de teléfono móvil en Ecuador
const mobilePhoneRegex = /^(?:\+591|0)9\d{8}$/;
export const validateMobilePhone = (phone) => {
  // Verificar si el número de teléfono está vacío
  if (!phone.trim()) {
    return 'Por favor, ingresa un número de teléfono.';
  }

  // Verificar si cumple con la expresión regular
  if (!mobilePhoneRegex.test(phone)) {
    return 'El número de teléfono móvil no es válido. Debe comenzar con 09 o +593 seguido de 8 dígitos.';
  }

  // Si pasa todas las validaciones, retornar null (sin errores)
  return null;
};


export const validateOnlyNumbers = (input) => {
  // Verificar si el campo está vacío
  if (!input.trim()) {
    return 'Por favor, ingresa un valor.';
  }

  // Expresión regular para permitir solo números
  const numericRegex = /^[0-9]+$/;

  // Verificar si cumple con la expresión regular
  if (!numericRegex.test(input)) {
    return 'El valor solo puede contener números.';
  }

  // Si pasa todas las validaciones, retornar null (sin errores)
  return null;
};
