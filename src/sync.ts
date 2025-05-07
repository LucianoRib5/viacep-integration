import { syncViaCepData } from './utils/viacepSync';

syncViaCepData().then(() => {
  process.exit(0);
});