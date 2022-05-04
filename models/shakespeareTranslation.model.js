import { cache } from "../caches/shakespeareTranslation.cache.js";

export default class shakespeareTranslationModel {
  constructor(inputText) {
    this.inputText = inputText;
    if (cache[inputText]) {
      this.translatedText = cache[inputText].translatedText;
    } else {
      cache[inputText] = {};
    }
    this.cache = cache[inputText];
  }

  async parseTranslatedText(data) {
    return data.json().then((data) => data.contents.translated);
  }

  async getTranslatedText() {
    if (this.translatedText) {
      return this.translatedText;
    }
    const translatorResponse = fetch(
      `https://api.funtranslations.com/translate/shakespeare.json?text=${this.inputText}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Funtranslations-Api-Secret": `${process.env.FUNTRANSLATIONS_API_SECRET}`,
        },
      }
    );
    this.cache.translatedText = await translatorResponse.then((data) =>
      this.parseTranslatedText(data)
    );
    return await this.cache.translatedText;
  }
}
