import { Configuration, OpenAIApi } from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAI {
    constructor(apiKey) {
        const configuration = new Configuration({apiKey});
        this.openai = new OpenAIApi(configuration);
    }

    chat() {}

    async transcription(filepath) {
        console.log(config);
        console.log(config.get('OPENAI_KEY'));
        try {
            const response = await this.openai.createTranscription(
                createReadStream(filepath),
                'whisper-1'
            )
            console.log(response);
            return response.data.text
        } catch(e) {
            console.log('Error while transcription', e.message);
        }
    }
}


export const openai = new OpenAI(config.get('OPENAI_KEY'))