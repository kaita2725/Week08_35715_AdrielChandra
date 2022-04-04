import React from "react";
import { useContext } from "react";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle} from "@ionic/react";
import MemoriesContext from '../data/memories-context';

const BadMemories: React.FC = () => {
    const memoriesctx = useContext(MemoriesContext);
    const badMemories =memoriesctx.memories.filter(memory => memory.type === 'bad');
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Bad Memories</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Bad Memories</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            {badMemories.length === 0 && (
              <IonRow>
                <IonCol className="ion-text-center">
                  <h2>No good memories found.</h2>
                </IonCol>
              </IonRow>
            )}
            {badMemories.map(memory => (
              <IonRow key={memory.id}>
                <IonCol>
                  <IonCard>
                    <img src={memory.base64url} alt={memory.title} />
                    <IonCardHeader>
                      <IonCardTitle>{memory.title}</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
          </IonContent>
        </IonPage>
    );
};

export default BadMemories;
