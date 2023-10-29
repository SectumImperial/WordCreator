import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { FormData } from '@/interface';

export const downloadWordFile = async (
  formData: FormData,
  file: File | null
) => {
  let arrayBuffer: ArrayBuffer;

  try {
    if (!file) {
      throw new Error('File is not provided');
    }

    arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
    });
  } catch (error) {
    console.error('An error occurred:', error);
    throw new Error('Cannot read the file');
  }

  const zip = new PizZip(arrayBuffer);

  const doc = new Docxtemplater();
  if (formData.total_amount && formData.imprest_amount) {
    formData['remaining_amount'] =
      formData.total_amount - formData.imprest_amount;
  }

  if (formData.gender === 'male') {
    formData['acting_word'] = 'действующего';
  } else if (formData.gender === 'female') {
    formData['acting_word'] = 'действующая';
  }

  doc.setData(formData);
  doc.loadZip(zip);

  doc.setData(formData);

  doc.render();

  const output = doc.getZip().generate({
    type: 'blob',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const url = window.URL.createObjectURL(output);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${formData.company_name_full || 'example'}.docx`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
