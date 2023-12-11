export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z0-9_]+$/;
  return nameRegex.test(name);
};

export const validateEmail = (email) => {
  return email.endsWith("@stud.noroff.no");
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateAvatar = async (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};
