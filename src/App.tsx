import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import MemoryTabs from './pages/MemoryTabs';
import BadMemories from './pages/BadMemories';
import GoodMemories from './pages/GoodMemories';
import NewMemory from './pages/NewMemory';
import MemoriesContextProvider from './data/MemoriesContextProvider';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <MemoriesContextProvider>
        <IonRouterOutlet id="main">
        <Route path="/tabs" component={MemoryTabs}/>
        <Route path="/BadMemories" component={BadMemories}/>
        <Route path="/GoodMemories" component={GoodMemories}/>
        <Route path='/NewMemory' component={NewMemory}/>
        <Redirect exact from="/" to="/tabs" />
        </IonRouterOutlet>
      </MemoriesContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
