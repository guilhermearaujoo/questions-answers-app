import express = require('express');
import router from './router/RespostaRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.routes();

    this.app.get('/', (_req, res) => res.status(200).send('Emepar API no ar!'));
  }

  private routes(): void {
    this.app.use(router);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Emepar API no ar na porta ${PORT}!`));
  }
}

export default App;
