export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z0-9_]+$/;
  return nameRegex.test(name);
};

export const validateEmail = (email) => {
  return email.endsWith("@stud.noroff.no");
};

export const validateAvatar = (avatar) => {
  const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
  return imageRegex.test(avatar);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};
