import shakespeareTranslationService from "../../services/shakespeareTranslation.service";
import { enableFetchMocks } from "jest-fetch-mock";
import dotenv from 'dotenv';

dotenv.config({ path: '../config.env.test' });

enableFetchMocks();

const mockShakespeareTranslationAPIRequests = (
  translatedText
) =>
  fetch
    .mockResponseOnce(
      JSON.stringify({
        "success": {
          "total": 1
        },
        "contents": {
          "translated": translatedText
        }
      })
    );



describe("shakespeareTranslation", () => {
  it(`should return the translated text of charizard's description`, async () => {
    mockShakespeareTranslationAPIRequests("Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.");
    const translatedText = await shakespeareTranslationService("Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.");
    expect(translatedText).toBe("Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.");
  });
});