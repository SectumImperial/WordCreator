import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { FormData } from '@/interface';
import { getShortName } from './getShortName';
import { numberToWordsRU } from './numberToWord';

export const downloadWordFile = async (
  formData: FormData,
  file: File | null
) => {
  if (!file) {
    console.error('File is not provided');
    throw new Error('File is not provided');
  }

  let arrayBuffer: ArrayBuffer;

  try {
    arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
    });
  } catch (error) {
    console.error('An error occurred while reading the file:', error);
    throw new Error('Cannot read the file');
  }

  try {
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater();

    if (formData.total_amount && formData.imprest_amount) {
      formData['remaining_amount'] =
        Number(formData.total_amount) - Number(formData.imprest_amount);
    }

    if (formData.total_amount) {
      formData['total_amount_word'] = numberToWordsRU(
        Number(formData.total_amount)
      );
    }

    if (formData.remaining_amount) {
      formData['remaining_amount_word'] = numberToWordsRU(
        Number(formData.remaining_amount)
      );
    }

    if (formData.imprest_amount) {
      formData['imprest_amount_word'] = numberToWordsRU(
        Number(formData.imprest_amount)
      );
    }

    if (formData.project_days) {
      formData['project_days_word'] = numberToWordsRU(
        Number(formData.project_days)
      );
    }

    if (formData.gender === 'male') {
      formData['acting_word'] = 'действующего';
    } else if (formData.gender === 'female') {
      formData['acting_word'] = 'действующая';
    }

    if (formData.person_full) {
      formData['person_short'] = getShortName(formData.person_full);
    }

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
  } catch (error) {
    console.error('An error occurred while processing the document:', error);
    throw new Error('Cannot process the document');
  }
};
