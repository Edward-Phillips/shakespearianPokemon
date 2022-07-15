import shakespeareTranslationModel from "../models/shakespeareTranslation.model.js";

export default async function shakespeareTranslationService(inputText) {
  const shakespeareTranslationModelInstance = new shakespeareTranslationModel(
    inputText
  );
  return shakespeareTranslationModelInstance.getOrCreateShakespeareTranslation();
}
