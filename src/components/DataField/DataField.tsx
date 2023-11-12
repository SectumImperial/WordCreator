import { useState, ChangeEvent } from 'react';
import styles from './data-field.module.css';

interface ParsedData {
  position?: string;
  action?: string;
  fullName?: string;
  companyName?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  bic?: string;
  rs?: string;
  ks?: string;
  email?: string;
}
const regexPatterns = {
  fullName:
    /(?:ФИО|Директор|Имя)[^\wА-ЯЁа-яё]*([А-ЯЁ][а-яё]+)\s+([А-ЯЁ][а-яё]+)\s+([А-ЯЁ][а-яё]+)/,
  companyName:
    /\b(ООО|Общество\s+с\s+ограниченной\s+ответственностью)[\s\S]*?«([^»]+)»/,
  inn: /\s?ИНН[\s\S]*?(\d{10}|\d{12})/,
  kpp: /\s?КПП[\s\S]*?(\d{9})/,
  combinedInnKpp: /\s?ИНН\/КПП[\s\S]*?(\d{10}|\d{12})\/(\d{9})/,
  ogrn: /\b(\d{13})\b/,
  bic: /\s?БИК[\s\S]*?(\d{9})\b/,
  rs: /(?:Р\.С|Р\\С|Р\/С|Расс\. счёт|Расч[её]тный\s+сч[её]т)[\s\S]*?(\d{20})\b/,
  ks: /(?:К\.С|К\\С|К\/С|Корр\. счёт|Корреспондентский\s+сч[её]т)[\s\S]*?(\d{20})\b/,
  email: /\b[Ee]-?[Mm]ail[\s\S]*?([\w.-]+@[\w.-]+\.\w+)\b/,
  position:
    /\b(директора?|генерального\sдиректора?|генеральный\sдиректор)[\s\S]*?\b/i,
  action: /\b(устава?|устав)\b/i,
};

export const DataField = () => {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedData>({
    position: 'Директор',
    action: 'Устава',
  });

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setInputText(text);
    parseText(text);
  };

  const parseText = (text: string) => {
    const results: ParsedData = { ...parsedData };

    const combinedMatch = text.match(regexPatterns.combinedInnKpp);
    if (combinedMatch) {
      results['inn'] = combinedMatch[1];
      results['kpp'] = combinedMatch[2];
    } else {
      // Обрабатываем ИНН и КПП отдельно
      const innMatch = text.match(regexPatterns.inn);
      if (innMatch) {
        results['inn'] = innMatch[1];
      }
      const kppMatch = text.match(regexPatterns.kpp);
      if (kppMatch) {
        results['kpp'] = kppMatch[1];
      }
    }

    // Обработка остальных полей
    for (const [key, pattern] of Object.entries(regexPatterns)) {
      if (key !== 'inn' && key !== 'kpp' && key !== 'combinedInnKpp') {
        const match = text.match(pattern);
        if (match) {
          if (key === 'fullName' && match[1] && match[2] && match[3]) {
            results[key as keyof ParsedData] =
              `${match[1]} ${match[2]} ${match[3]}`.trim();
          } else if (match[1]) {
            results[key as keyof ParsedData] = match[1].trim();
          }
        }
      }
    }

    results.position = results.position || 'Директор';
    results.action = results.action || 'Устава';

    console.log(results);
    setParsedData(results);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Текст карточки компании</h2>
      <textarea
        className={styles.textarea}
        cols={55}
        rows={25}
        value={inputText}
        onChange={handleTextChange}
      />
    </div>
  );
};
