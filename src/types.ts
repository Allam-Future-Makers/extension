export interface IrabResponse {
  original_sentence: string;
  irab_results: IrabResult[];
  special_sentences: SpecialSentence[];
  diacratized_sentence: string;
}

export interface IrabResult {
  word: string;
  irab: string;
}

export interface SpecialSentence {
  sentence: string;
  special_irab: string;
}

export interface MSAResponse {
  result: string;
}

export interface TashkeelResponse {
  original: string;
  diacritized: string;
}

export interface DictionaryResponse {
  answer: string;
}
