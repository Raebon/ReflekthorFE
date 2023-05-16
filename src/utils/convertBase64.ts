export const convertBase64 = (file: Blob) => {
  if (file instanceof Blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.substring(
          base64String.indexOf(",") + 1
        );
        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  return;
};
