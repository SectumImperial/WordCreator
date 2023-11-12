export function numberToWordsRU(number: number): string {
  const ones: string[] = [
    '',
    'один',
    'два',
    'три',
    'четыре',
    'пять',
    'шесть',
    'семь',
    'восемь',
    'девять',
  ];
  const teens: string[] = [
    'десять',
    'одиннадцать',
    'двенадцать',
    'тринадцать',
    'четырнадцать',
    'пятнадцать',
    'шестнадцать',
    'семнадцать',
    'восемнадцать',
    'девятнадцать',
  ];
  const tens: string[] = [
    '',
    '',
    'двадцать',
    'тридцать',
    'сорок',
    'пятьдесят',
    'шестьдесят',
    'семьдесят',
    'восемьдесят',
    'девяносто',
  ];
  const hundreds: string[] = [
    '',
    'сто',
    'двести',
    'триста',
    'четыреста',
    'пятьсот',
    'шестьсот',
    'семьсот',
    'восемьсот',
    'девятьсот',
  ];

  const parseGroup = (num: string): string => {
    if (num === '000') return '';
    const [h, t, o] = num.split('').map(Number);
    return `${hundreds[h]} ${
      t === 1 ? teens[o] : `${tens[t]} ${ones[o]}`
    }`.trim();
  };

  const groups = String(number).padStart(9, '0').match(/.{3}/g) as string[];

  const [millions, thousands, lastGroup] = groups.map(parseGroup);

  const millionsText =
    millions &&
    `${millions} миллион${getPluralForm(millions, ['', 'а', 'ов'])} `;
  const thousandsText =
    thousands &&
    `${thousands} тысяч${getPluralForm(thousands, ['а', 'и', ''])} `;
  const lastGroupText = lastGroup;

  return `${millionsText || ''}${thousandsText || ''}${
    lastGroupText || 'ноль'
  }`.trim();
}

function getPluralForm(number: string, forms: string[]): string {
  const lastDigit = Number(number[number.length - 1]);
  if (lastDigit === 1) return forms[0];
  if (lastDigit >= 2 && lastDigit <= 4) return forms[1];
  return forms[2];
}
