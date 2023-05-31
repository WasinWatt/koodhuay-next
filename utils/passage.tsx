import Passage from '@passageidentity/passage-node';

const passage = new Passage({
  appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID!!,
  apiKey: process.env.PASSAGE_API_KEY,
});

export default passage