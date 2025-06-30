import { KObj } from 'k-ts';

export const TranslationKey = {
  Group: {},
  Question: {
    Practise_Button: 'Question_Practise_Button',
    Hint_Button: 'Question_Hint_Button',
    Check_Button: 'Question_Check_Button',
    Speak_Button: 'Question_Speak_Button',
    ReAnswer_Button: 'Question_ReAnswer_Button',
    Import_Modal: 'Question_Import_Modal',
  },
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const AppTranslationUtil = {
  genCode: <T extends KObj>(pre: string, key: keyof T) => {
    return `${capitalizeFirstLetter(pre)}_${capitalizeFirstLetter(String(key))}`;
  },
};

export default AppTranslationUtil;
